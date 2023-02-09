#!/bin/bash

set -Eeuo pipefail
export HERE=$(dirname $(readlink -f "$0"))
[ ! -z "${DEBUG+x}" ] && set -x

#if [ -z $1 ]

org=$(curl -X POST -H "Content-Type: application/json" -d '{"name":"'${1}'"}' http://admin:admin@172.18.100.116:3000/api/orgs | sed 's/.*"orgId\":\(.*\)}/\1/g')
if [[ "$org" == *"name taken"* ]]; then
  echo $org
  echo "Org exists, name taken!"
  exit 1
fi

curl -X POST -H "Content-Type: application/json" -d '{"loginOrEmail":"admin", "role": "Admin"}' http://admin:admin@172.18.100.116:3000/api/orgs/${org}/users
curl -X POST http://admin:admin@172.18.100.116:3000/api/user/using/${org}
apikey=$(curl -X POST -H "Content-Type: application/json" -d '{"name":"apikeycurl", "role": "Admin"}' http://admin:admin@172.18.100.116:3000/api/auth/keys | sed 's/.*"key":"\(.*\)"}/\1/g')
export $apikey
echo $apikey


