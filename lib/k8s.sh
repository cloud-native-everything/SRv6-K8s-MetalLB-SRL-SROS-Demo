#!/bin/bash

pod_ip() {
    local pod="$1"
    shift 1
    kubectl get pods "$pod" -o json "$@" --context kind-$KIND_CNAME| jq -r '.status.podIP'
}

get_workers() {
    kubectl get nodes --no-headers --context kind-$KIND_CNAME \
        -o custom-columns=NAME:.metadata.name \
        -l '!node-role.kubernetes.io/master' "$@"
}

get_k8s_nodes() {
    kubectl get nodes --no-headers --context kind-$KIND_CNAME \
        -o custom-columns=NAME:.metadata.name \
        "$@"
}

wait_for_obj_ready() {
    local timeout="$1"
    local klass="$2"
    local ns="$3"
    shift 3
    echo "Waiting for $klass '$@' to come up"
    for i in "$@"; do
        while [ -z "$(kubectl get -n "$ns" "$klass" --context kind-$KIND_CNAME | grep "$i")" ]; do
            sleep 1
            printf "."
        done
    done
    kubectl -n "$ns" wait --for=condition=Ready "${klass}" --timeout="$timeout" "$@" --context kind-$KIND_CNAME
}

wait_for_pod_ready() {
    wait_for_obj_ready "180s" "pod" "default" "$@"
}

kevents() {
    kubectl get events --sort-by='.metadata.creationTimestamp' -A --context kind-$KIND_CNAME
}

k8s_net() {
    ITF="$1"
    OCTECT="$2"
    NETW="$3"

    ip link set "$ITF" down
    ip link set "$ITF" up mtu 9500
    ip addr add "$NETW"."$OCTECT"/24 dev "$ITF"
    ip link set "$ITF" up

    ip route del default
    ip route add default via "$NETW".1
}    
