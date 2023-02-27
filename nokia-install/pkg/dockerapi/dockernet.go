package DockerNet

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/docker/docker/api/types/network"
)

func DockerNetworkCreate() {
	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		panic(err)
	}

	// Create an IPAM configuration with a subnet
	ipamConfig := &network.IPAMConfig{
		Subnet: "172.18.0.0/16",
	}

	networkResponse, err := cli.NetworkCreate(context.Background(), "kind", types.NetworkCreate{
		CheckDuplicate: true,
		Driver:         "bridge",
		EnableIPv6:     false,
		IPAM: &network.IPAM{
			Driver: "default",
			Config: []network.IPAMConfig{*ipamConfig},
		},
		Internal:       false,
	})
	if err != nil {
		panic(err)
	}
	if networkResponse.ID != "network_id" {
		fmt.Printf("expected networkResponse.ID to be 'network_id', got %s\n", networkResponse.ID)
	}
	if networkResponse.Warning != "warning" {
	        fmt.Printf("expected networkResponse.Warning to be 'warning', got %s\n", networkResponse.Warning)
	}
}
