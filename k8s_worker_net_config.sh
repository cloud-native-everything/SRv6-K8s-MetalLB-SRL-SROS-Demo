#!/bin/bash
VLANS=(251 252 253 254)
ITF="$1"
BOND=bond0

ip link add "$BOND" type bond
ip link set "$ITF" down
ip link set "$ITF" master "$BOND"
ip link set "$BOND" up mtu 9500

for vlan in "${VLANS[@]}"; do
    ip link add link "$BOND" name "VLAN-${vlan}" type vlan id "$vlan"
    ip link set dev "VLAN-${vlan}" up
done
