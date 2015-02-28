#!/usr/bin/env bash

#set -x

changelog_version=$(cat DEBIAN/changelog | grep -Eom1 "[0-9]+\.[0-9]+\-[0-9]+")
package="haroldbot_${changelog_version}.deb"
package_in_s3=$(curl http://aosyborg.s3.amazonaws.com/ | grep -o ${package})

# Don't deploy if the package already exists
if [ "${package_in_s3}" ]; then
    echo "${package} already in S3!"
    exit 0
fi

# Install the latest aws cli
virtualenv ~/.virtualenv
pip install awscli

# Update the package
~/.virtualenv/bin/aws s3 cp ${package} "s3://aosyborg/repo/${package}"

# Update Packages.gz
dpkg-scanpackages . | gzip > Packages.gz
curl http://aosyborg.s3.amazonaws.com/repo/Packages.gz >> Packages.gz
~/.virtualenv/bin/aws s3 cp Packages.gz s3://aosyborg/repo/Packages.gz

# Install on EC2 instances
aws opsworks --region us-east-1 create-deployment --stack-id $AWS_OPSWORKS_STACK_ID \
    --command "{\"Name\":\"execute_recipes\", \"Args\":{\"recipes\":[\"harold-bot::deploy\"]}}"
