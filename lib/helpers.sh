#!/bin/bash

debug() {
    [ ! -z "${DEBUG+x}" ] && "$@" || true
}

export_release() {
    local tag="$2"
    git -C "$1" \
        archive -o "${tag}-$(git -C "$1" rev-parse --short HEAD).zip" \
        HEAD
}

ssh_pod() {
    local pod="$1"
    shift 1
    docker exec -it \
        "$(kubectl get pods ${pod} -o json | jq -r '.spec.nodeName')" \
        ssh -oStrictHostKeyChecking=no \
            -oConnectTimeout=10 \
            -oUserKnownHostsFile=/dev/null \
            "$@"
}
