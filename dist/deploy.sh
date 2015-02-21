#!/bin/bash

set -x

#Ensure version was passed
if [[ $# -eq 0 ]] ; then
    display_help
    exit 1
fi

# Ensure version is of proper format
if ! [[ $1 =~ ^[[:digit:]]+\.[[:digit:]]\-[[:digit:]]+$ ]] ; then
    display_help
    exit 1
fi

file="haroldbot_$1.deb"
resource="/$AWS_S3_BUCKET/${file}"
contentType="application/x-debian-package"
dateValue=`date -R`
stringToSign="PUT\n\n${contentType}\n${dateValue}\n${resource}"
signature=`echo -en ${stringToSign} | openssl sha1 -hmac $AWS_SECRET_ACCESS_KEY -binary | base64`
curl -X PUT -T "${file}" \
  -H "Host: $AWS_S3_BUCKET.s3.amazonaws.com" \
  -H "Date: ${dateValue}" \
  -H "Content-Type: ${contentType}" \
  -H "Authorization: AWS $AWS_ACCESS_KEY_ID:${signature}" \
  https://$AWS_S3_BUCKET.s3.amazonaws.com/${file}
