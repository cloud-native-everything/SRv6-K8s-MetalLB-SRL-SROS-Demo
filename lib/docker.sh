#!/bin/bash

do_docker_login() {
    for reg in "$@"; do
        echo "Logging in $reg"
        docker login "$reg"
    done
}

do_check_docker_logins() {
    if [ ! -f ~/.docker/config.json ]; then
        echo "No docker config attempting to login to all used registries"
        do_docker_login "$@"
    fi
    for r in "$@"; do
        if [ "$(jq -r ".auths | with_entries(select(.key == \"$r\"))" < ~/.docker/config.json)" = "{}" ]; then
            echo "Logging in $r"
            docker login "$r"
        fi
    done
}
