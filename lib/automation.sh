#!/bin/bash

run_ansible() {
    pushd "${HERE}/lib/automation"
        ansible-playbook provision.yml \
            -e target_blade="$(hostname)" \
            -i hosts \
            -e ssh_remote_user="$(woami)"
    popd
}
