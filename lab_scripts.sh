#!/bin/bash

set -Eeuo pipefail
export HERE=$(dirname $(readlink -f "$0"))
[ ! -z "${DEBUG+x}" ] && set -x

start_all() {
    ./k8s-clusters.sh -s
    clab deploy --topo topo.yml
    ./k8s-clusters.sh -l
    ./k8s-clusters.sh -x
    kubectl apply -f ${HERE}/metallb/metallb-namespace.yaml --context kind-datacenter
    kubectl apply -f ${HERE}/metallb/metallb-manifest.yaml --context kind-datacenter
    kubectl apply -f ${HERE}/metallb/metallb-bgp-setup.yaml --context kind-datacenter
    kubectl apply -f ${HERE}/app/hello-app-python-datacenter.yaml --context kind-datacenter
    kubectl apply -f ${HERE}/app/hello-app-lb-datacenter.yaml --context kind-datacenter
    kubectl apply -f ${HERE}/app/ipvlan-cni-edge1.yaml --context kind-edge1
    kubectl apply -f ${HERE}/app/ipvlan-pods-edge1.yaml --context kind-edge1
    kubectl apply -f ${HERE}/app/ipvlan-cni-edge2.yaml --context kind-edge2
    kubectl apply -f ${HERE}/app/ipvlan-pods-edge2.yaml --context kind-edge2
    kubectl apply -f ${HERE}/app/prom.yaml --context kind-edge1
}

clean_all() {
    ./k8s-clusters.sh -C
    clab destroy --topo topo.yml
}

declare -A _OPTIONS
_OPTIONS["S"]="Start Lab"
_OPTIONS["C"]="Clean Lab"
_OPTIONS["h"]="Help menu"

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
        S)
            start_all
            ;;
        C)
            clean_all
            ;;
        h)
            usage
            ;;
    esac
done

