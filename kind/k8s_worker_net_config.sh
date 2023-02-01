#!/bin/bash
ITF="$1"
OCTECT="$2"
NETW="$3"

ip link set "$ITF" down
ip link set "$ITF" up mtu 9500
ip addr add "$NETW"."$OCTECT"/24 dev "$ITF"
ip link set "$ITF" up

ip route del default
ip route add default via "$NETW".1


