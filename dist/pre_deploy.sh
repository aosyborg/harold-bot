#!/usr/bin/env bash

# Ensure changelog exists
if [ ! -f changelog ]; then
    echo "Change log missing!"
    exit 1
fi

# Grab version from change log
changelog_version=$(cat changelog | grep -Eom1 "[0-9]+\.[0-9]+")
if [ ! ${changelog_version} ]; then
    echo "Unable to find version in changelog!"
    exit 1
fi

# Update the version
# Because of retardation at amazon, only version 0.0 is supported right now, once they fix this
# we will want to actually use our version.
# http://docs.aws.amazon.com/codedeploy/latest/userguide/app-spec-ref.html#app-spec-ref-version
# sed -i -e "s|%VERSION%|${changelog_version}|" appspec.yml
sed -i -e "s|%VERSION%|0.0|" appspec.yml
