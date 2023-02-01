#!/bin/bash

VNO_DOCKER_LOCAL_E1="${VNO_DOCKER_LOCAL_E1:-localhost:5000}"
TNG_TAG="${TNG_TAG:-latest}"
#TNG="${TNG:-${VNO_DOCKER_LOCAL_E1}/tng-transpiler:${TNG_TAG}}"
TNG="${TNG:-tng-transpiler:${TNG_TAG}}"
TNG_DOCKER_NAME="${TNG_DOCKER_NAME:-tng-transpiler}"
TNG_PROFILE="profile.zip"


run_tng() {
    docker stop ${TNG_DOCKER_NAME} &>/dev/null || true
    docker rm ${TNG_DOCKER_NAME} &>/dev/null  || true
    #docker pull "${TNG}" 
    mkdir -p "${HOME}/.kube"
    docker run -d --name ${TNG_DOCKER_NAME} \
        --network host \
        -v "${HOME}/.kube:/kubeconfig" \
        --restart always \
        "$TNG"
}

create_tng_profile() {
    echo "Updating TNG profile"
    pushd "$1" &>/dev/null
        rm -f "${TNG_PROFILE}"
        zip -r "${TNG_PROFILE}" *
    popd &>/dev/null
}

prepare_tng_profile() {
    local d="$1"
    local profile="${d}/${TNG_PROFILE}"
    if [ ! -e "$profile" ]; then
        create_tng_profile "$d"
    else
        for f in "$d"*".yaml" ; do
            if [ "$f" -nt "$profile" ]; then
                create_tng_profile "$d"
                return
            fi
        done
        for f in "${d}/profiles/"* ; do
            if [ "$f" -nt "$profile" ]; then
                create_tng_profile "$d"
                return
            fi
        done
    fi
}

transpile_tng() {
    local filename="$1"
    local d="$(dirname $filename)/rendered"
    mkdir -p "$d"
    local output="${d}/$(basename $filename .tng).tgz"
    prepare_tng_profile "$(dirname $filename)"
    echo "using docker image: $TNG_DOCKER_NAME"
    if ! docker ps | grep "$TNG_DOCKER_NAME" &>/dev/null; then
        echo 'tng image not present, tryin to pull it'
        run_tng
    fi
    if  [ ! $(curl --silent --show-error \
                -X POST \
                "http://localhost:5000/vno/v1/tosca_ng/transpiler/helm" \
                -H "accept: application/gzip" \
                -H "Content-Type: multipart/form-data" \
                -F "kubeconfig=@${HOME}/.kube/config" \
                -F "profile_zip=@$(dirname $filename)/${TNG_PROFILE}" \
                -F "tng_file=@${filename}" \
                -o "$output" \
                -w "%{http_code}") -eq 200 ]; then
        mv "$output" "${output}.log"
        if ! python3 -m json.tool "${output}.log"; then
            cat "${output}.log"
        fi
        exit 1
    else
        local dir="${output%.*}"
        echo "Rendered ${filename} to ${output}"
        rm -rf "$dir"
        mkdir -p "$dir"
        echo "Extracting to $dir"
        tar -xf "$output" -C "$dir"
        debug helm template "$dir"
    fi
}
