SSID=$(cat /sys/class/net/wlan0/address | tail -c 10 | tr -d ":")
PW=$(cat /proc/cpuinfo | tail -c 9)

cat >name_of_file.json <<EOF
    {
      "wifi": {
          "ssid": "$SSID",
          "pw":   "$PW"
      }
    }
EOF