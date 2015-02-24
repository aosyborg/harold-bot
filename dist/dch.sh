#!/usr/bin/env bash

set -e

package="haroldbot"
version="0.0-0" # make it bloody obvious it needs to be updated
log=$(git log -1 | sed "1,4d")
date=$(date)
host=$(hostname -s)
user=$(id -un)



content="${package} (${version}) release; urgency=medium

  * ${log}

 -- <${user}@${host} ${date}
"

# Be mean and force them into vi if no editor set
if [ ! $EDITOR ]; then
    EDITOR=vi
fi

# Prompt for update then write it
echo "${content}" | cat - DEBIAN/changelog > changelog
$EDITOR changelog
mv -f changelog DEBIAN/changelog
