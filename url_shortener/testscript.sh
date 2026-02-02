#!/bin/bash

BASE_URL="http://127.0.0.1:3000"

if [ $# -ne 1 ]; then
  echo "Usage: $0 [1|2]"
  echo "1 -> Shorten a long URL"
  echo "2 -> Resolve a short URL"
  exit 1
fi

OPTION=$1

if [ "$OPTION" == "1" ]; then
  read -p "Enter the long URL: " LONG_URL
  echo
  echo "Calling POST /shorten ..."
  echo
  curl -s -X POST "$BASE_URL/shorten" \
    -H "Content-Type: application/json" \
    -d "{\"url\":\"$LONG_URL\"}" \
    -w "\nHTTP_STATUS: %{http_code}\n"

elif [ "$OPTION" == "2" ]; then
  read -p "Enter the shortId: " SHORT_ID

  echo
  echo "Calling GET /$SHORT_ID ..."
  echo

  curl -s -I "$BASE_URL/$SHORT_ID" \
    -w "\nHTTP_STATUS: %{http_code}\n"

else
  echo "Invalid option. Use 1 or 2."
  exit 1
fi
