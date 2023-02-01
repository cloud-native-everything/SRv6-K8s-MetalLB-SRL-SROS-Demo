#!/bin/bash

ENC_COMPONENTS=(enc-nws-operator enc-nws-cni enc-nwi-operator)
#ARTIFACTORY_URL=https://artifactory-wro1.int.net.nokia.com/artifactory
#ARTIFACTORY_URL=${ARTIFACTORY_URL:-http://10.167.58.81:9090/repository/wro1-vno-generic-candidates-local}

delete_enc() {
    local nwi="$1/enc-nwi-operator/selected"

    helm uninstall -n kube-system enc-nwi-cni || true
    helm uninstall -n enc-nws-system enc-nws-operator || true
    helm uninstall -n enc-nwi-system enc-nwi-operator || true
    kubectl delete namespace enc-nws-system || true
    kubectl patch crd/workloadinterfaces.nws.enc.nokia.com \
        -p '{"metadata":{"finalizers":[]}}' --type=merge || true
    kubectl delete crd/workloadinterfaces.nws.enc.nokia.com || true
    kubectl delete namespace enc-nwi-system || true
    kubectl patch crd/srlinuxconfigs.nwi.enc.nokia.com \
        -p '{"metadata":{"finalizers":[]}}' --type=merge || true
    kubectl delete crd/srlinuxconfigs.nwi.enc.nokia.com || true
    kubectl patch crd/srosconfigs.nwi.enc.nokia.com \
        -p '{"metadata":{"finalizers":[]}}' --type=merge || true
    kubectl delete crd/srosconfigs.nwi.enc.nokia.com || true
}

deploy_enc() {
    local nwi="$1/enc-nwi-operator/selected"
    kubectl apply -f "${nwi}/config/v1_namespace_enc-nwi-system.yaml"
    kubectl get --namespace enc-nwi-system configmaps | \
        grep sros-jsonschema || kubectl create -f "${nwi}/data/"sros-*.yaml
    kubectl get --namespace enc-nwi-system configmaps | \
        grep srlinux-jsonschema || kubectl create -f "${nwi}/data/"srlinux-*.yaml
    helm install enc-nwi-operator "${nwi}/charts/"enc-nwi-operator-*.tgz \
        --set replicaCount=1 \
        --set enc_nwi_operator.images.enc_nwi_operator.registry="docker.io/library" \
        --namespace enc-nwi-system

    helm install enc-nws-operator "$1/enc-nws-operator/selected/charts/"enc-nws-operator-*.tgz \
        --set replicaCount=1 \
        --set enc_nws_operator.images.enc_nws_controller.registry="docker.io/library" \
        --namespace enc-nws-system \
        --create-namespace 

    helm install enc-nwi-cni "$1/enc-nws-cni/selected/charts/"enc-nws-cni-*.tgz \
        --set enc_nws_cni.images.enc_nws_cni.registry="docker.io/library" \
        --set enc_nws_cni.images.enc_nws_cni.pullPolicy="IfNotPresent" \
        --namespace kube-system 
}

install_asset() {
    local cwd="$1"
    local f="$2"
    local end=${f#*-*-*-}
    local start=${f%$end}
    local component=${start::-1}
    local dest="${cwd}/${component}"
    tar -xf "$f" -C "$dest"
    ln -sf "$(readlink -f ${dest}/$component)" "${dest}/selected"
    echo "{\"file\":\"$(readlink -f "$f")\"}" > "${dest}/selected/SRC.json"
}

download_asset() {
    echo "Attempting to download asset: $2"
    local content=$(jf rt s "vno-generic-candidates-local/$2/*/*.tar.gz" --sort-by created --sort-order desc --limit 1)
    echo "Fetched: "
    python3 -m json.tool <<EOF
    $content
EOF
    local path=$(jq -r '.[0] | .path' <<< "$content")
    local dest="$1/$2"
    jf rt dl "$path" "${dest}/" --flat
    local name=$(jq -r '.[0] | .props.RELEASE_ARTIFACT_BASENAME | .[0]' <<< "$content")
    tar -xf "${dest}/${name}.tar.gz" -C "$dest"
    ln -sf "$(readlink -f ${dest}/$name)" "${dest}/selected"
    jq '.[0]' <<< "$content" > "${dest}/selected/SRC.json"
}

enc_docker_images() {
    for enc in "${ENC_COMPONENTS[@]}"; do
        local p="$1/${enc}/selected"
        local image_name=$(docker image load -i "${p}/images/"*.tar | grep "Loaded" | sed 's/Loaded image: //')
        echo "$image_name"
    done
}

update_assets() {
    local cwd="$1"
    shift 1
    if [ "$#" -ne 0 ]; then
        for f in "$@"; do
            install_asset "$cwd" "$f" &
        done
    fi
#    if ! jf rt ping --url "$ARTIFACTORY_URL"; then
#        echo "Please setup jfrog credentials for URL: $ARTIFACTORY_URL"
#        exit 1
#    fi
    for asset in "${ENC_COMPONENTS[@]}"; do
        download_asset "$cwd" "$asset" &
    done
    wait
}

assert_assets() {
    for i in "${ENC_COMPONENTS[@]}"; do
        if [ ! -e "$1/${i}/selected" ]; then
            update_assets "$1"
            break
        fi
    done
}
