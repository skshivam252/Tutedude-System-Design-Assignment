#!/bin/bash

BASE_URL="http://127.0.0.1:3000"

echo
echo "Choose an option:"
echo "1 -> Shorten a long URL"
echo "2 -> Resolve a short URL"
echo "q -> Quit"
echo

while true; do
  echo
  read -p "Enter choice: " OPTION
  case "$OPTION" in
    1)
      read -p "Enter the long URL: " LONG_URL

      RESPONSE=$(curl -s -X POST "$BASE_URL/shorten" \
        -H "Content-Type: application/json" \
        -d "{\"url\":\"$LONG_URL\"}" \
        -w "\nHTTP_STATUS:%{http_code}")

      BODY=$(echo "$RESPONSE" | sed '$d')
      STATUS=$(echo "$RESPONSE" | tail -n1 | cut -d: -f2)
      echo
      echo "HTTP Status Code: $STATUS"
      echo "Response Body: $BODY"
      ;;

    2)
      read -p "Enter the shortId: " SHORT_ID

      HEADERS=$(curl -s -D - -o /dev/null "$BASE_URL/$SHORT_ID")

      STATUS=$(echo "$HEADERS" | head -n1 | awk '{print $2}')
      LOCATION=$(echo "$HEADERS" | grep -i "^Location:" | cut -d' ' -f2- | tr -d '\r')
      echo
      echo "HTTP Status Code: $STATUS"
      if [ "$STATUS" = "301" ]; then
        echo "Redirect Location: $LOCATION"
      fi
      ;;

    q|Q|exit)
      echo "Exiting"
      break
      ;;

    *)
      echo "Invalid option. Enter 1, 2, or q."
      ;;
  esac
done
