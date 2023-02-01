#!/bin/bash

set -Eeuo pipefail
export HERE=$(dirname $(readlink -f "$0"))
[ ! -z "${DEBUG+x}" ] && set -x


#Edge1
clab tools veth create -a clab-srv6-demo-LEAF-E1-1:e1-10 -b edge1-worker:e1-1
clab tools veth create -a clab-srv6-demo-LEAF-E1-2:e1-10 -b edge1-worker2:e1-1
docker exec -i  edge1-worker bash -s "e1-1" "101" "10.1.4" < "${HERE}/kind/k8s_worker_net_config.sh"
docker exec -i  edge1-worker2 bash -s "e1-1" "102" "10.1.4" < "${HERE}/kind/k8s_worker_net_config.sh"

#Edge2
clab tools veth create -a clab-srv6-demo-LEAF-E2-1:e1-10 -b edge2-worker:e1-1
clab tools veth create -a clab-srv6-demo-LEAF-E2-1:e1-11 -b edge2-worker2:e1-1
docker exec -i  edge2-worker bash -s "e1-1" "101" "10.7.4" < "${HERE}/kind/k8s_worker_net_config.sh"
docker exec -i  edge2-worker2 bash -s "e1-1" "102" "10.7.4" < "${HERE}/kind/k8s_worker_net_config.sh"


#Datacenter
clab tools veth create -a clab-srv6-demo-LEAF-DC-1:e1-10 -b datacenter-worker:e1-1
clab tools veth create -a clab-srv6-demo-LEAF-DC-1:e1-11 -b datacenter-worker2:e1-1
clab tools veth create -a clab-srv6-demo-LEAF-DC-2:e1-10 -b datacenter-worker3:e1-1
clab tools veth create -a clab-srv6-demo-LEAF-DC-2:e1-11 -b datacenter-worker4:e1-1
docker exec -i  datacenter-worker bash -s "e1-1" "101" "192.168.101" < "${HERE}/kind/k8s_worker_net_config.sh"
docker exec -i  datacenter-worker2 bash -s "e1-1" "102" "192.168.101" < "${HERE}/kind/k8s_worker_net_config.sh"
docker exec -i  datacenter-worker3 bash -s "e1-1" "103" "192.168.101" < "${HERE}/kind/k8s_worker_net_config.sh"
docker exec -i  datacenter-worker4 bash -s "e1-1" "104" "192.168.101" < "${HERE}/kind/k8s_worker_net_config.sh"
