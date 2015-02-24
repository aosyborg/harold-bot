#!/usr/bin/env bash

#set -x

changelog_version=$(cat DEBIAN/changelog | grep -Eom1 "[0-9]+\.[0-9]+\-[0-9]+")
package="haroldbot_${changelog_version}.deb"
package_in_s3=$(curl http://aosyborg.s3.amazonaws.com/ | grep ${package})

# Don't deploy if the package already exists
if [ ${package_in_s3} ]; then
    echo "${package} already in S3!"
    exit 0
fi


authorization() {
    local signature="$(string_to_sign | hmac_sha1 | base64)"
    echo "AWS ${AWS_ACCESS_KEY_ID?}:${signature}"
}

hmac_sha1() {
    openssl dgst -binary -sha1 -hmac "${AWS_SECRET_ACCESS_KEY?}"
}

base64() {
    openssl enc -base64
}

bin_md5() {
    openssl dgst -binary -md5
}

string_to_sign() {
    echo "$http_method"
    echo "$content_md5"
    echo "$content_type"
    echo "$date"
    echo "x-amz-acl:$acl"
    printf "/$bucket/$remote_path"
}

date_string() {
    LC_TIME=C date "+%a, %d %h %Y %T %z"
}

file="$1"
bucket="aosyborg"
content_type="$2"

http_method=PUT
acl="public-read"
remote_path="repo/${file##*/}"
content_md5="$(bin_md5 < "$file" | base64)"
date="$(date_string)"

url="https://$bucket.s3.amazonaws.com/$remote_path"

curl -qsSf -T "$file" \
  -H "Authorization: $(authorization)" \
  -H "x-amz-acl: $acl" \
  -H "Date: $date" \
  -H "Content-MD5: $content_md5" \
  -H "Content-Type: $content_type" \
  "$url"

echo "$url"
