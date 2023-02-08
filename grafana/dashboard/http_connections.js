{
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": {
          "type": "grafana",
          "uid": "-- Grafana --"
        },
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "target": {
          "limit": 100,
          "matchAny": false,
          "tags": [],
          "type": "dashboard"
        },
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  "id": 3,
  "links": [],
  "liveNow": false,
  "panels": [
    {
      "datasource": {
        "type": "prometheus"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "min": 0,
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 11,
        "w": 14,
        "x": 0,
        "y": 0
      },
      "id": 2,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom"
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "prometheus"
          },
          "expr": "tcp_connect_mean{job=\"push-c1-e1-to-dc\"}",
          "refId": "A"
        },
        {
          "datasource": {
            "type": "prometheus"
          },
          "expr": "content_transfer_mean{job=\"push-c1-e1-to-dc\"}",
          "hide": false,
          "refId": "B"
        },
        {
          "datasource": {
            "type": "prometheus"
          },
          "editorMode": "code",
          "expr": "server_processing_mean{job=\"push-c1-e1-to-dc\"}",
          "format": "time_series",
          "hide": false,
          "legendFormat": "",
          "range": true,
          "refId": "C"
        }
      ],
      "title": "Customer1: Edge1 to DC",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "prometheus"
      },
      "description": "",
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "min": 0,
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 11,
        "w": 14,
        "x": 0,
        "y": 11
      },
      "id": 3,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "list",
          "placement": "bottom"
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "prometheus"
          },
          "expr": "tcp_connect_mean{job=\"push-c2-e1-to-dc\"}",
          "refId": "A"
        },
        {
          "datasource": {
            "type": "prometheus"
          },
          "expr": "content_transfer_mean{job=\"push-c2-e1-to-dc\"}",
          "hide": false,
          "refId": "B"
        },
        {
          "datasource": {
            "type": "prometheus"
          },
          "editorMode": "code",
          "expr": "server_processing_mean{job=\"push-c2-e1-to-dc\"}",
          "format": "time_series",
          "hide": false,
          "legendFormat": "",
          "range": true,
          "refId": "C"
        }
      ],
      "title": "Customer2: Edge1 to DC",
      "type": "timeseries"
    }
  ],
  "refresh": "5s",
  "schemaVersion": 36,
  "style": "dark",
  "tags": [],
  "templating": {
    "list": []
  },
  "time": {
    "from": "now-15m",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "",
  "title": "http_connections",
  "uid": "Cj7thrAVk",
  "version": 1,
  "weekStart": ""
}
