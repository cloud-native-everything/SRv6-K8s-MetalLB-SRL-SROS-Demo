#!/bin/bash

set -Eeuo pipefail
export HERE=$(dirname $(readlink -f "$0"))
[ ! -z "${DEBUG+x}" ] && set -x

KIND_IMG="enc-kind-worker"
KIND_IMG_VERSION="1.22.2"  # Images older than 22.2 have a broken containerd config
CLAB_LNAME=srv6-demo
MULTUS_FLAVOUR=multus-daemonset
MULTUS_BASE_URL="https://raw.githubusercontent.com/k8snetworkplumbingwg/multus-cni/master"
MULTUS_DEPLOYMENT_URL="${MULTUS_BASE_URL}/deployments"
MULTUS_DAEMONSET_URL="${MULTUS_DEPLOYMENT_URL}/${MULTUS_FLAVOUR}.yml"
CERT_MANAGER_URL="https://github.com/jetstack/cert-manager/releases/download/v1.6.2/cert-manager.yaml"
CHART_NAME=metallb

SIDELOAD_IMAGES_SRC=(alpine:latest busybox:latest python:latest quay.io/metallb/speaker:v0.12.1 quay.io/metallb/controller:v0.12.1 rogerw/cassowary:v0.14.1 pinrojas/cassowary:0.33 prom/pushgateway:latest)
SIDELOAD_IMAGES=(alpine:latest busybox:latest python:latest  quay.io/metallb/speaker:v0.12.1 quay.io/metallb/controller:v0.12.1 rogerw/cassowary:v0.14.1 pinrojas/cassowary:0.33 prom/pushgateway:latest)


for f in "${HERE}/lib/"*.sh; do
    source "$f"
done


kind_clean() {
    kind delete cluster --name "$KIND_CNAME" || true 
}

kind_ip() {
    docker exec "$1" \
    ip -4 a show eth0 | \
    awk '/inet/ { split($2,s,"/"); print s[1]; }'
}


pull_docker_images() {
    for img in "${SIDELOAD_IMAGES_SRC[@]}"; do
        docker pull "$img"
    done

    for img in $(enc_docker_images "$HERE"); do
        SIDELOAD_IMAGES+=("$img")
    done
}

sideload_worker() {
    for img in "${SIDELOAD_IMAGES[@]}"; do
        kind load docker-image --name "$KIND_CNAME" --nodes "$1" "$img"
    done
}

sideload_cp() {
    kind load docker-image "alpine:latest" --name "$KIND_CNAME" \
        --nodes "${KIND_CNAME}-control-plane"
}

sideload_docker_images() {
    pull_docker_images
    
    for node in $(get_k8s_nodes); do
        sideload_worker "$node" &
    done
    sideload_cp &

    wait
}

provision_kind_worker() {
    local node="$1"

    echo "Provisioning kind node $node"
    _clab tools disable-tx-offload -c "$node"
    if [ -e "${HERE}/kind/config_node_${node}.sh" ]; then
        echo "Running config_node_${node}.sh"
        docker exec -i "$node" bash < "${HERE}/kind/config_node_${node}.sh" 
        sleep 2
    fi
}

apply_cluster_manifests() {
    kubectl create -f "${HERE}/kind/multus-daemonset.yml"
    kubectl create -f "${HERE}/kind/cni-install.yml"
}

kind_cluster() {
    if kind get clusters 2>&1 | grep "$KIND_CNAME" &>/dev/null; then
        echo "A kind cluster already exists."
        echo "Delete with 'kind delete cluster --name $KIND_CNAME' or rerun the script with -c"
        return
    fi

    kind create cluster --name "$KIND_CNAME" \
        --config "${HERE}/kind/cluster_${KIND_CNAME}.yaml" \
        --image "$KIND_IMG:v${KIND_IMG_VERSION}"
    sideload_docker_images
    for node in $(get_workers); do
        provision_kind_worker "$node" &
    done
    wait
    apply_cluster_manifests
}



clean_lab() {
    KIND_CNAME=$1
    kind_clean
}


start_lab() {
    KIND_CNAME=$1
    kind_cluster
    sleep 1
}

get_clusters() {
    # Taking cluster from kind folder
    search_dir=./kind
    for entry in "$search_dir"/*
    do
            echo "$entry" | grep cluster | sed -n 's/\.\/kind\/cluster_\(.*\)\.yaml/\1/p'
    done
}

kind_clab_connect() {

    local key_orig="";
    local key_dest="";
    local key_ipv4="";

    # import content from yaml to bash arrays kind_clab_link.yml
    #echo "${HERE}/kind/kind_clab_link.yml" "kind_clab_link"
    yay "${HERE}/kind/kind_clab_link.yml" ""

    for key in "${kind_clab_link[@]}"
    do 
        key_orig="${key}_orig";
        key_dest="${key}_dest";
        key_ipv4="${key}_ipv4";
        _clab tools veth create -a "${!key_orig}"  -b  "${!key_dest}"

    done

}

docker_net_config () {
    local bond="bond0"
    local node="${1}"
    local itf="${2}"
    local octect="${3}"
    local netwk="${4}"
    local VLANS=(251 252)
    echo Setting "$node and interface ${itf} to ${netwk}.${octect}/24"
    docker exec -i "$node" bash -c "ip link add ${bond} type bond; ip link set ${itf} down; ip link set ${itf} master ${bond}; ip link set ${bond} up mtu 9500; ip addr add ${netwk}.${octect}/24 dev ${bond}; ip route del default; ip route add default via ${netwk}.1"
    sleep 2
    for vlan in "${VLANS[@]}"
    do
        echo "Setting up ${vlan} at ${bond} in ${node}"
        docker exec -i "$node" bash -c "ip link add link ${bond} name VLAN-${vlan} type vlan id ${vlan}; ip link set dev VLAN-${vlan} up"
        sleep 2                                
    done                

}

kind_net_config() {

    local key_orig="";
    local key_dest="";
    local key_ipv4="";
    local node="";
    local itf=""
    local octect=""
    local netwk=""    

    # import content from yaml to bash arrays kind_clab_link.yml
    #echo "${HERE}/kind/kind_clab_link.yml" "kind_clab_link"
    yay "${HERE}/kind/kind_clab_link.yml" ""

    for key in "${kind_clab_link[@]}"
    do 
        key_orig="${key}_orig";
        key_dest="${key}_dest";
        key_ipv4="${key}_ipv4";
        node=$( echo ${!key_dest} | sed -En 's/(.*):.*/\1/p' )
        itf=$( echo ${!key_dest} | sed -En 's/.*:(.*)/\1/p' )
        octect=$( echo ${!key_ipv4} | sed -En 's/(.*\..*\..*)\.(.*)/\2/p' )
        netwk=$( echo ${!key_ipv4} | sed -En 's/(.*\..*\..*)\.(.*)/\1/p' )
        docker_net_config $node $itf $octect $netwk
        
    done

}

create_clusters() {
    for value in $(get_clusters)
    do
        start_lab $value
    done
}

clean_clusters() {
    for value in $(get_clusters)
    do
        clean_lab $value
    done
}

declare -A _OPTIONS
_OPTIONS["s"]="Create Kind K8s Clusters"
_OPTIONS["C"]="Clean Kind K8s Clusters"
_OPTIONS["l"]="Connect Kind K8s Clusters with Clan Nodes"
_OPTIONS["x"]="Change Net Settigs for K8s Workers"
_OPTIONS["h"]="Display this message"

options_keys() {
    printf '%s\n' "${!_OPTIONS[@]}" | sort
}

options_keystring() {
    options_keys | tr -d '\n'
}

usage() {
    echo "Usage: $0 [-$(options_keystring)]"
    for k in "${!_OPTIONS[@]}"; do
        echo "    -${k} ${_OPTIONS[$k]}"
    done
    exit 1
}

while getopts "$(options_keystring)" o; do
    case "${o}" in
        s)
            create_clusters
            ;;
        C)
            clean_clusters
            ;;
        l)
            kind_clab_connect
            ;;
        x)
            kind_net_config
            ;;            
        h)
            usage
            ;;
    esac
done
