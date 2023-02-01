#!/bin/bash

set -Eeuo pipefail
[ ! -z "${DEBUG+x}" ] && set -x

HERE=$(dirname $(readlink -f "$0"))


for rez in srlinuxconfigs.nwi.enc.nokia.com srosconfigs.nwi.enc.nokia.com; do
    kubectl patch crd "$rez" --type json --patch-file="${HERE}/enhance-crd-output.yaml"
done
