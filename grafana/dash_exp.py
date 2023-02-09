#!/usr/bin/env python

"""Grafana dashboard exporter"""

import json
import os
import requests

HOST = 'http://172.18.100.116:3000'
API_KEY = os.environ["grafana_api_key"]

DIR = 'exported-dashboards/'

def main():
    headers = {'Authorization': 'Bearer %s' % (API_KEY,)}
    response = requests.get('%s/api/search?query=&' % (HOST,), headers=headers)
    response.raise_for_status()
    dashboards = response.json()

    if not os.path.exists(DIR):
        os.makedirs(DIR)

    for d in dashboards:
        print ("Saving: " + d['title'])
        response = requests.get('%s/api/dashboards/%s' % (HOST, d['uri']), headers=headers)
        data = response.json()['dashboard']
        dash = json.dumps(data, sort_keys=True, indent=4, separators=(',', ': '))
        name = data['title'].replace(' ', '_').replace('/', '_').replace(':', '').replace('[', '').replace(']', '')
        tmp = open(DIR + name + '.json', 'w')
        tmp.write(dash)
        tmp.write('\n')
        tmp.close()


if __name__ == '__main__':
    main()
