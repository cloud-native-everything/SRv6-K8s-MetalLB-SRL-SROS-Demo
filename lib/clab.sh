#/bin/bash

_clab() {
    sudo containerlab "$@"
}

clab_ip() {
    docker exec "$1" \
        ip -4 a show dummy-mgmt0 | \
        awk '/inet/ { split($2,s,"/"); print s[1]; }'
}

clab_gnmi() {
    local node="$1"
    local target="$2"
    local action="$3"
    local path="$4"
    shift 4
    local query
    if [ "$action" = "get" ]; then
        query=(--path "/state${path}")
    else
        if [ -e "$1" ]; then
            query=(--update-path "/configure${path}" --update-file "$1" "$@")
        else
            query=(--update-path "/configure${path}" --update-value "$@")
        fi
    fi
    docker exec -it "$node" \
        gnmic -a "$target" -u admin -p admin --insecure \
        "$action" "${query[@]}"
}
