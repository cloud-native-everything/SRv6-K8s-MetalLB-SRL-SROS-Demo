{
  "srl_nokia-acl:acl": {
    "cpm-filter": {
      "ipv4-filter": {
        "statistics-per-entry": true,
        "entry": [
          {
            "sequence-id": 10,
            "description": "Accept incoming ICMP unreachable messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "protocol": "icmp",
              "icmp": {
                "type": "dest-unreachable",
                "code": [
                  0,
                  1,
                  2,
                  3,
                  4,
                  13
                ]
              }
            }
          },
          {
            "sequence-id": 20,
            "description": "Accept incoming ICMP time-exceeded messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "protocol": "icmp",
              "icmp": {
                "type": "time-exceeded"
              }
            }
          },
          {
            "sequence-id": 30,
            "description": "Accept incoming ICMP parameter problem messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "protocol": "icmp",
              "icmp": {
                "type": "param-problem"
              }
            }
          },
          {
            "sequence-id": 40,
            "description": "Accept incoming ICMP echo messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "protocol": "icmp",
              "icmp": {
                "type": "echo"
              }
            }
          },
          {
            "sequence-id": 50,
            "description": "Accept incoming ICMP echo-reply messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "protocol": "icmp",
              "icmp": {
                "type": "echo-reply"
              }
            }
          },
          {
            "sequence-id": 60,
            "description": "Accept incoming SSH when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 22
              }
            }
          },
          {
            "sequence-id": 70,
            "description": "Accept incoming SSH when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 22
              }
            }
          },
          {
            "sequence-id": 80,
            "description": "Accept incoming Telnet when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 23
              }
            }
          },
          {
            "sequence-id": 90,
            "description": "Accept incoming Telnet when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 23
              }
            }
          },
          {
            "sequence-id": 100,
            "description": "Accept incoming TACACS+ when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 49
              }
            }
          },
          {
            "sequence-id": 110,
            "description": "Accept incoming TACACS+ when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 49
              }
            }
          },
          {
            "sequence-id": 120,
            "description": "Accept incoming DNS response messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "source-port": {
                "operator": "eq",
                "value": 53
              }
            }
          },
          {
            "sequence-id": 130,
            "description": "Accept incoming DHCP messages targeted for BOOTP/DHCP client",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 68
              }
            }
          },
          {
            "sequence-id": 140,
            "description": "Accept incoming TFTP read-request and write-request messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 69
              }
            }
          },
          {
            "sequence-id": 150,
            "description": "Accept incoming HTTP(JSON-RPC) when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 80
              }
            }
          },
          {
            "sequence-id": 160,
            "description": "Accept incoming HTTP(JSON-RPC) when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 80
              }
            }
          },
          {
            "sequence-id": 170,
            "description": "Accept incoming NTP messages from servers",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "source-port": {
                "operator": "eq",
                "value": 123
              }
            }
          },
          {
            "sequence-id": 180,
            "description": "Accept incoming SNMP GET/GETNEXT messages from servers",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 161
              }
            }
          },
          {
            "sequence-id": 190,
            "description": "Accept incoming BGP when the other router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 179
              }
            }
          },
          {
            "sequence-id": 200,
            "description": "Accept incoming BGP when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 179
              }
            }
          },
          {
            "sequence-id": 210,
            "description": "Accept incoming HTTPS(JSON-RPC) when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 443
              }
            }
          },
          {
            "sequence-id": 220,
            "description": "Accept incoming HTTPS(JSON-RPC) when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 443
              }
            }
          },
          {
            "sequence-id": 230,
            "description": "Accept incoming single-hop BFD session messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 3784
              }
            }
          },
          {
            "sequence-id": 240,
            "description": "Accept incoming multi-hop BFD session messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 4784
              }
            }
          },
          {
            "sequence-id": 250,
            "description": "Accept incoming uBFD session messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 6784
              }
            }
          },
          {
            "sequence-id": 260,
            "description": "Accept incoming gNMI messages when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 57400
              }
            }
          },
          {
            "sequence-id": 270,
            "description": "Accept incoming UDP traceroute messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "destination-port": {
                "range": {
                  "start": 33434,
                  "end": 33464
                }
              }
            }
          },
          {
            "sequence-id": 280,
            "description": "Accept incoming ICMP timestamp messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "protocol": "icmp",
              "icmp": {
                "type": "timestamp"
              }
            }
          },
          {
            "sequence-id": 290,
            "description": "Accept incoming OSPF messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": 89
            }
          },
          {
            "sequence-id": 300,
            "description": "Accept incoming DHCP relay messages targeted for BOOTP/DHCP server",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 67
              }
            }
          },
          {
            "sequence-id": 310,
            "description": "Accept ICMP fragment packets",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "fragment": true,
              "protocol": "icmp"
            }
          },
          {
            "sequence-id": 320,
            "description": "Accept incoming LDP packets",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "udp",
              "source-port": {
                "operator": "eq",
                "value": 646
              }
            }
          },
          {
            "sequence-id": 330,
            "description": "Accept incoming LDP packets with source-port 646",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 646
              }
            }
          },
          {
            "sequence-id": 340,
            "description": "Accept incoming LDP packets with destination-port 646",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "protocol": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 646
              }
            }
          },
          {
            "sequence-id": 350,
            "description": "Drop all else",
            "action": {
              "drop": {
                "log": true
              }
            }
          }
        ]
      },
      "ipv6-filter": {
        "statistics-per-entry": true,
        "entry": [
          {
            "sequence-id": 10,
            "description": "Accept incoming ICMPv6 unreachable messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "next-header": "icmp6",
              "icmp6": {
                "type": "dest-unreachable",
                "code": [
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6
                ]
              }
            }
          },
          {
            "sequence-id": 20,
            "description": "Accept incoming ICMPv6 packet-too-big messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "next-header": "icmp6",
              "icmp6": {
                "type": "packet-too-big"
              }
            }
          },
          {
            "sequence-id": 30,
            "description": "Accept incoming ICMPv6 time-exceeded messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "next-header": "icmp6",
              "icmp6": {
                "type": "time-exceeded"
              }
            }
          },
          {
            "sequence-id": 40,
            "description": "Accept incoming ICMPv6 parameter problem messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "next-header": "icmp6",
              "icmp6": {
                "type": "param-problem"
              }
            }
          },
          {
            "sequence-id": 50,
            "description": "Accept incoming ICMPv6 echo-request messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "next-header": "icmp6",
              "icmp6": {
                "type": "echo-request"
              }
            }
          },
          {
            "sequence-id": 60,
            "description": "Accept incoming ICMPv6 echo-reply messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "next-header": "icmp6",
              "icmp6": {
                "type": "echo-reply"
              }
            }
          },
          {
            "sequence-id": 70,
            "description": "Accept incoming ICMPv6 router-advertisement messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "next-header": "icmp6",
              "icmp6": {
                "type": "router-advertise"
              }
            }
          },
          {
            "sequence-id": 80,
            "description": "Accept incoming ICMPv6 neighbor-solicitation messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "next-header": "icmp6",
              "icmp6": {
                "type": "neighbor-solicit"
              }
            }
          },
          {
            "sequence-id": 90,
            "description": "Accept incoming ICMPv6 neighbor-advertisement messages",
            "action": {
              "accept": {
                "rate-limit": {
                  "system-cpu-policer": "icmp"
                }
              }
            },
            "match": {
              "next-header": "icmp6",
              "icmp6": {
                "type": "neighbor-advertise"
              }
            }
          },
          {
            "sequence-id": 100,
            "description": "Accept incoming SSH when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 22
              }
            }
          },
          {
            "sequence-id": 110,
            "description": "Accept incoming SSH when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 22
              }
            }
          },
          {
            "sequence-id": 120,
            "description": "Accept incoming Telnet when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 23
              }
            }
          },
          {
            "sequence-id": 130,
            "description": "Accept incoming Telnet when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 23
              }
            }
          },
          {
            "sequence-id": 140,
            "description": "Accept incoming TACACS+ when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 49
              }
            }
          },
          {
            "sequence-id": 150,
            "description": "Accept incoming TACACS+ when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 49
              }
            }
          },
          {
            "sequence-id": 160,
            "description": "Accept incoming DNS response messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "udp",
              "source-port": {
                "operator": "eq",
                "value": 53
              }
            }
          },
          {
            "sequence-id": 170,
            "description": "Accept incoming TFTP read-request and write-request messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 69
              }
            }
          },
          {
            "sequence-id": 180,
            "description": "Accept incoming HTTP(JSON-RPC) when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 80
              }
            }
          },
          {
            "sequence-id": 190,
            "description": "Accept incoming HTTP(JSON-RPC) when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 80
              }
            }
          },
          {
            "sequence-id": 200,
            "description": "Accept incoming NTP messages from servers",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "udp",
              "source-port": {
                "operator": "eq",
                "value": 123
              }
            }
          },
          {
            "sequence-id": 210,
            "description": "Accept incoming SNMP GET/GETNEXT messages from servers",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 161
              }
            }
          },
          {
            "sequence-id": 220,
            "description": "Accept incoming BGP when the other router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 179
              }
            }
          },
          {
            "sequence-id": 230,
            "description": "Accept incoming BGP when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 179
              }
            }
          },
          {
            "sequence-id": 240,
            "description": "Accept incoming HTTPS(JSON-RPC) when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 443
              }
            }
          },
          {
            "sequence-id": 250,
            "description": "Accept incoming HTTPS(JSON-RPC) when this router initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "source-port": {
                "operator": "eq",
                "value": 443
              }
            }
          },
          {
            "sequence-id": 260,
            "description": "Accept incoming DHCPv6 client messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 546
              }
            }
          },
          {
            "sequence-id": 270,
            "description": "Accept incoming single-hop BFD session messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 3784
              }
            }
          },
          {
            "sequence-id": 280,
            "description": "Accept incoming multi-hop BFD session messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 4784
              }
            }
          },
          {
            "sequence-id": 290,
            "description": "Accept incoming uBFD session messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 6784
              }
            }
          },
          {
            "sequence-id": 300,
            "description": "Accept incoming gNMI messages when the other host initiates the TCP connection",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "tcp",
              "destination-port": {
                "operator": "eq",
                "value": 57400
              }
            }
          },
          {
            "sequence-id": 310,
            "description": "Accept incoming UDP traceroute messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "udp",
              "destination-port": {
                "range": {
                  "start": 33434,
                  "end": 33464
                }
              }
            }
          },
          {
            "sequence-id": 320,
            "description": "Accept incoming IPV6 hop-in-hop messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": 0
            }
          },
          {
            "sequence-id": 330,
            "description": "Accept incoming IPV6 fragment header messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": 44
            }
          },
          {
            "sequence-id": 340,
            "description": "Accept incoming OSPF messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": 89
            }
          },
          {
            "sequence-id": 350,
            "description": "Accept incoming DHCPv6 relay messages",
            "action": {
              "accept": {
                
              }
            },
            "match": {
              "next-header": "udp",
              "destination-port": {
                "operator": "eq",
                "value": 547
              }
            }
          },
          {
            "sequence-id": 360,
            "description": "Drop all else",
            "action": {
              "drop": {
                "log": true
              }
            }
          }
        ]
      }
    },
    "policers": {
      "system-cpu-policer": [
        {
          "name": "icmp",
          "entry-specific": false,
          "peak-packet-rate": 1000,
          "max-packet-burst": 1000
        }
      ]
    }
  },
  "srl_nokia-interfaces:interface": [
    {
      "name": "ethernet-1/1",
      "admin-state": "enable",
      "subinterface": [
        {
          "index": 0,
          "admin-state": "enable",
          "ip-mtu": 5000,
          "ipv4": {
            "address": [
              {
                "ip-prefix": "10.1.2.1/31"
              }
            ]
          }
        }
      ]
    },
    {
      "name": "ethernet-1/2",
      "admin-state": "enable",
      "subinterface": [
        {
          "index": 0,
          "admin-state": "enable",
          "ip-mtu": 5000,
          "ipv4": {
            "address": [
              {
                "ip-prefix": "10.2.2.1/31"
              }
            ]
          }
        }
      ]
    },
    {
      "name": "ethernet-1/10",
      "admin-state": "enable",
      "subinterface": [
        {
          "index": 0,
          "type": "srl_nokia-interfaces:bridged",
          "admin-state": "enable"
        }
      ]
    },
    {
      "name": "ethernet-1/11",
      "admin-state": "enable",
      "subinterface": [
        {
          "index": 0,
          "type": "srl_nokia-interfaces:bridged",
          "admin-state": "enable"
        }
      ]
    },
    {
      "name": "irb0",
      "admin-state": "enable",
      "subinterface": [
        {
          "index": 0,
          "admin-state": "enable",
          "ipv4": {
            "address": [
              {
                "ip-prefix": "192.168.101.1/24",
                "anycast-gw": true
              }
            ],
            "srl_nokia-interfaces-nbr:arp": {
              "learn-unsolicited": true,
              "host-route": {
                "populate": [
                  {
                    "route-type": "dynamic"
                  }
                ]
              },
              "srl_nokia-interfaces-nbr-evpn:evpn": {
                "advertise": [
                  {
                    "route-type": "dynamic"
                  }
                ]
              }
            }
          },
          "anycast-gw": {
            
          }
        }
      ]
    },
    {
      "name": "lo1",
      "admin-state": "enable",
      "subinterface": [
        {
          "index": 0,
          "admin-state": "enable",
          "ipv4": {
            "address": [
              {
                "ip-prefix": "1.1.1.202/32"
              }
            ]
          }
        }
      ]
    },
    {
      "name": "mgmt0",
      "admin-state": "enable",
      "subinterface": [
        {
          "index": 0,
          "admin-state": "enable",
          "ipv4": {
            "srl_nokia-interfaces-ip-dhcp:dhcp-client": {
              
            }
          },
          "ipv6": {
            "srl_nokia-interfaces-ip-dhcp:dhcp-client": {
              
            }
          }
        }
      ]
    },
    {
      "name": "system0",
      "admin-state": "enable",
      "subinterface": [
        {
          "index": 0,
          "admin-state": "enable",
          "ipv4": {
            "address": [
              {
                "ip-prefix": "1.1.1.2/32"
              }
            ]
          }
        }
      ]
    }
  ],
  "srl_nokia-system:system": {
    "srl_nokia-aaa:aaa": {
      "authentication": {
        "idle-timeout": 7200,
        "authentication-method": [
          "local"
        ]
      },
      "server-group": [
        {
          "name": "local"
        }
      ]
    },
    "srl_nokia-gnmi-server:gnmi-server": {
      "admin-state": "enable",
      "network-instance": [
        {
          "name": "mgmt",
          "admin-state": "enable",
          "tls-profile": "clab-profile"
        }
      ]
    },
    "srl_nokia-tls:tls": {
      "server-profile": [
        {
          "name": "clab-profile",
          "key": "$aes$f5peZEXxQJ/g=$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",
          "certificate": "-----BEGIN CERTIFICATE-----\nMIIEGjCCAwKgAwIBAgIUTFeI2xq8245lWMytOYmD46oJdPcwDQYJKoZIhvcNAQEL\nBQAwYTELMAkGA1UEBhMCQkUxEDAOBgNVBAcTB0FudHdlcnAxDjAMBgNVBAoTBU5v\na2lhMRYwFAYDVQQLEw1Db250YWluZXIgbGFiMRgwFgYDVQQDEw9tZXRhbGxiIFJv\nb3QgQ0EwHhcNMjMwMTMwMTgzMDAwWhcNMjQwMTMwMTgzMDAwWjBmMQswCQYDVQQG\nEwJCRTEQMA4GA1UEBxMHQW50d2VycDEOMAwGA1UEChMFTm9raWExFjAUBgNVBAsT\nDUNvbnRhaW5lciBsYWIxHTAbBgNVBAMTFHNybC1sZWFmMi5tZXRhbGxiLmlvMIIB\nIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt+vBRJYALrEvHGYS31laStb7\nWRTKqhJTE8TwE8MF4fV/dF7UWtW8IF6rwWsNqoxoUZWrv6flcIruO+5fHpbDMrqh\nZnUh0W+1k5y9DE1hU5pfaTIqwFaIA0PEC7MuI/2Bny2Mvw5UHKnVN0TcPjUJDGTD\n8o9UOPFZzp2IT0sbLieIxbPdRpZB41aTsQl4chpmWhW1ytoUdzzmdQxbKjIHp4kl\ntfjEhiZ5bLN9UEWDO4ZvtPdO8GVrav4exy263YULNDEqgf7+/Acy28mgNGSbSpZh\nG0rxY1nKzGN3xHsJeW5Gb3tkQCVrg5wNmu4u1y2blxdFaPAa9mq2GguePl1izQID\nAQABo4HEMIHBMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYI\nKwYBBQUHAwIwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUGAz6lonJ8lqLHli7d1BW\nyeAyq6wwHwYDVR0jBBgwFoAU8/S1AKnrewrxs3viD6SLC4GvKkEwQgYDVR0RBDsw\nOYIJc3JsLWxlYWYyghZjbGFiLW1ldGFsbGItc3JsLWxlYWYyghRzcmwtbGVhZjIu\nbWV0YWxsYi5pbzANBgkqhkiG9w0BAQsFAAOCAQEAmwJ7Zak4lQL/04HGBWqprTEd\ncFHdnOqC//G5RTKBvlruWQ+v8JnUdgqemvDZ1AqUWr2PrtqRhPc3VPf13iEC35vJ\nuU1Vg7HWCNJPL2Qeoy6ECzwf5fkzSJuaZ9H2yHRVJGHBV6bkvZ2kIapRpRp0V3aK\ni0wD+R5u0xu913fX7Ft3QNmv35YloDWb8b29IKWFVTAItckJ+exeAr2432mEEa7c\nKCut9Uct+Nx+B9D/0uGR/7gY41Tg4o3CwyMgXb9cpw+Ny95MbWuAmCRA32Y9p0mx\nZjuQxubq3EvqmeaeyLJRfRlts9pAWYcd3aDUquQmDkeG1PFwuiV4gY++9aiXcg==\n-----END CERTIFICATE-----\n",
          "authenticate-client": false
        }
      ]
    },
    "srl_nokia-json-rpc:json-rpc-server": {
      "admin-state": "enable",
      "network-instance": [
        {
          "name": "mgmt",
          "http": {
            "admin-state": "enable"
          },
          "https": {
            "admin-state": "enable",
            "tls-profile": "clab-profile"
          }
        }
      ]
    },
    "srl_nokia-ssh:ssh-server": {
      "network-instance": [
        {
          "name": "mgmt",
          "admin-state": "enable"
        }
      ]
    },
    "srl_nokia-lldp:lldp": {
      "admin-state": "enable",
      "management-address": [
        {
          "subinterface": "mgmt0.0",
          "type": [
            "IPv4"
          ]
        }
      ]
    },
    "srl_nokia-logging:logging": {
      "buffer": [
        {
          "buffer-name": "messages",
          "rotate": 3,
          "size": "10000000",
          "facility": [
            {
              "facility-name": "local6",
              "priority": {
                "match-above": "informational"
              }
            }
          ]
        },
        {
          "buffer-name": "system",
          "facility": [
            {
              "facility-name": "auth",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "cron",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "daemon",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "ftp",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "kern",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "lpr",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "mail",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "news",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "syslog",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "user",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "uucp",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "local0",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "local1",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "local2",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "local3",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "local4",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "local5",
              "priority": {
                "match-above": "warning"
              }
            },
            {
              "facility-name": "local7",
              "priority": {
                "match-above": "warning"
              }
            }
          ]
        }
      ],
      "file": [
        {
          "file-name": "messages",
          "rotate": 3,
          "size": "10000000",
          "facility": [
            {
              "facility-name": "local6",
              "priority": {
                "match-above": "warning"
              }
            }
          ]
        }
      ]
    }
  },
  "srl_nokia-network-instance:network-instance": [
    {
      "name": "default",
      "interface": [
        {
          "name": "ethernet-1/1.0"
        },
        {
          "name": "ethernet-1/2.0"
        },
        {
          "name": "system0.0"
        }
      ],
      "protocols": {
        "srl_nokia-bgp:bgp": {
          "autonomous-system": 65002,
          "router-id": "1.1.1.2",
          "group": [
            {
              "group-name": "eBGP-underlay",
              "admin-state": "enable",
              "export-policy": "export-all",
              "import-policy": "import-all",
              "failure-detection": {
                "enable-bfd": true,
                "fast-failover": true
              },
              "timers": {
                "keepalive-interval": 2,
                "minimum-advertisement-interval": 2
              }
            },
            {
              "group-name": "iBGP-evpn",
              "admin-state": "enable",
              "import-policy": "evpn-type5",
              "peer-as": 65123,
              "evpn": {
                "admin-state": "enable"
              },
              "local-as": [
                {
                  "as-number": 65123
                }
              ],
              "timers": {
                "minimum-advertisement-interval": 1
              },
              "transport": {
                "local-address": "1.1.1.2"
              }
            }
          ],
          "ipv4-unicast": {
            "admin-state": "enable"
          },
          "neighbor": [
            {
              "peer-address": "1.1.1.11",
              "admin-state": "enable",
              "peer-group": "iBGP-evpn"
            },
            {
              "peer-address": "1.1.1.12",
              "admin-state": "enable",
              "peer-group": "iBGP-evpn"
            },
            {
              "peer-address": "10.1.2.0",
              "admin-state": "enable",
              "peer-as": 64999,
              "peer-group": "eBGP-underlay"
            },
            {
              "peer-address": "10.2.2.0",
              "admin-state": "enable",
              "peer-as": 64999,
              "peer-group": "eBGP-underlay"
            }
          ],
          "route-advertisement": {
            "rapid-withdrawal": true
          }
        }
      }
    },
    {
      "name": "kube-ipvrf",
      "type": "srl_nokia-network-instance:ip-vrf",
      "interface": [
        {
          "name": "irb0.0"
        },
        {
          "name": "lo1.0"
        }
      ],
      "vxlan-interface": [
        {
          "name": "vxlan1.4"
        }
      ],
      "protocols": {
        "bgp-evpn": {
          "srl_nokia-bgp-evpn:bgp-instance": [
            {
              "id": 1,
              "admin-state": "enable",
              "vxlan-interface": "vxlan1.4",
              "evi": 4,
              "ecmp": 4
            }
          ]
        },
        "srl_nokia-bgp:bgp": {
          "admin-state": "enable",
          "autonomous-system": 65302,
          "router-id": "1.1.1.202",
          "dynamic-neighbors": {
            "accept": {
              "match": [
                {
                  "prefix": "192.168.101.0/24",
                  "peer-group": "metallb-bgp",
                  "allowed-peer-as": [
                    "65201",
                    "65202"
                  ]
                }
              ]
            }
          },
          "group": [
            {
              "group-name": "border",
              "peer-as": 65310
            },
            {
              "group-name": "metallb-bgp",
              "admin-state": "enable",
              "export-policy": "export-all",
              "import-policy": "import-metallb-pool",
              "timers": {
                "minimum-advertisement-interval": 1
              },
              "transport": {
                "local-address": "1.1.1.202"
              }
            }
          ],
          "ipv4-unicast": {
            "admin-state": "enable",
            "multipath": {
              "allow-multiple-as": true,
              "max-paths-level-1": 16,
              "max-paths-level-2": 16
            }
          },
          "neighbor": [
            {
              "peer-address": "1.1.1.210",
              "export-policy": "export-all",
              "peer-group": "border",
              "timers": {
                "connect-retry": 120,
                "minimum-advertisement-interval": 1
              }
            }
          ]
        },
        "srl_nokia-bgp-vpn:bgp-vpn": {
          "bgp-instance": [
            {
              "id": 1,
              "route-target": {
                "export-rt": "target:65123:4",
                "import-rt": "target:65123:4"
              }
            }
          ]
        }
      }
    },
    {
      "name": "kube_macvrf",
      "type": "srl_nokia-network-instance:mac-vrf",
      "interface": [
        {
          "name": "ethernet-1/10.0"
        },
        {
          "name": "ethernet-1/11.0"
        },
        {
          "name": "irb0.0"
        }
      ],
      "vxlan-interface": [
        {
          "name": "vxlan1.1"
        }
      ],
      "protocols": {
        "bgp-evpn": {
          "srl_nokia-bgp-evpn:bgp-instance": [
            {
              "id": 1,
              "admin-state": "enable",
              "vxlan-interface": "vxlan1.1",
              "evi": 1
            }
          ]
        },
        "srl_nokia-bgp-vpn:bgp-vpn": {
          "bgp-instance": [
            {
              "id": 1,
              "route-target": {
                "export-rt": "target:65123:1",
                "import-rt": "target:65123:1"
              }
            }
          ]
        }
      }
    },
    {
      "name": "mgmt",
      "type": "srl_nokia-network-instance:ip-vrf",
      "admin-state": "enable",
      "description": "Management network instance",
      "interface": [
        {
          "name": "mgmt0.0"
        }
      ],
      "protocols": {
        "srl_nokia-linux:linux": {
          "import-routes": true,
          "export-routes": true,
          "export-neighbors": true
        }
      }
    }
  ],
  "srl_nokia-routing-policy:routing-policy": {
    "prefix-set": [
      {
        "name": "metallb-pool",
        "prefix": [
          {
            "ip-prefix": "10.254.254.240/28",
            "mask-length-range": "28..32"
          }
        ]
      }
    ],
    "policy": [
      {
        "name": "bgp-vpn-metallb",
        "statement": [
          {
            "sequence-id": 10,
            "match": {
              "prefix-set": "metallb-pool"
            },
            "action": {
              "reject": {
                
              }
            }
          },
          {
            "sequence-id": 999,
            "action": {
              "accept": {
                
              }
            }
          }
        ]
      },
      {
        "name": "evpn-type5",
        "statement": [
          {
            "sequence-id": 10,
            "match": {
              "prefix-set": "metallb-pool",
              "bgp": {
                "evpn": {
                  "route-type": [
                    5
                  ]
                }
              }
            },
            "action": {
              "reject": {
                
              }
            }
          },
          {
            "sequence-id": 999,
            "action": {
              "accept": {
                
              }
            }
          }
        ]
      },
      {
        "name": "export-all",
        "default-action": {
          "accept": {
            
          }
        }
      },
      {
        "name": "import-all",
        "default-action": {
          "accept": {
            
          }
        }
      },
      {
        "name": "import-metallb-pool",
        "statement": [
          {
            "sequence-id": 10,
            "match": {
              "prefix-set": "metallb-pool"
            },
            "action": {
              "accept": {
                "bgp": {
                  "local-preference": {
                    "set": 300
                  }
                }
              }
            }
          },
          {
            "sequence-id": 20,
            "action": {
              "reject": {
                
              }
            }
          }
        ]
      }
    ]
  },
  "srl_nokia-tunnel-interfaces:tunnel-interface": [
    {
      "name": "vxlan1",
      "vxlan-interface": [
        {
          "index": 1,
          "type": "srl_nokia-interfaces:bridged",
          "ingress": {
            "vni": 1
          }
        },
        {
          "index": 4,
          "type": "srl_nokia-interfaces:routed",
          "ingress": {
            "vni": 4
          }
        },
        {
          "index": 6,
          "type": "srl_nokia-interfaces:bridged",
          "ingress": {
            "vni": 6
          }
        }
      ]
    }
  ]
}