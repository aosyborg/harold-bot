#!/bin/bash

set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APPNAME="haroldbot"

# Ensure changelog exists
if [ ! -f DEBIAN/changelog ]; then
    echo "Change log missing!"
    exit 1
fi

# Grab version from change log
changelog_version=$(cat DEBIAN/changelog | grep -Eom1 "[0-9]+\.[0-9]+\-[0-9]+")
if [ ! ${changelog_version} ]; then
    echo "Unable to find version in changelog!"
    exit 1
fi

# Create build directory
BUILDDIR="$DIR/$APPNAME"
BUILDDIR+="_${changelog_version}"
mkdir $BUILDDIR
cp -r $DIR/DEBIAN $BUILDDIR

# Update the version
sed -i -e "s|_VERSION_|${changelog_version}|" $BUILDDIR/DEBIAN/control

##
# Stage code for packaging
#

# Configs and start script
mkdir -p $BUILDDIR/etc/harold-bot
cp -r $DIR/etc/harold-bot/config.sh.default $BUILDDIR/etc/harold-bot
cp -r $DIR/etc/init.d $BUILDDIR/etc
cp -r $DIR/etc/nginx $BUILDDIR/etc

# Main
mkdir -p $BUILDDIR/opt/harold-bot
cp -r $DIR/../bin $BUILDDIR/opt/harold-bot
cp -r $DIR/../config $BUILDDIR/opt/harold-bot
cp -r $DIR/../lib $BUILDDIR/opt/harold-bot
cp -r $DIR/../routes $BUILDDIR/opt/harold-bot
cp -r $DIR/../app.js $BUILDDIR/opt/harold-bot
cp -r $DIR/../package.json $BUILDDIR/opt/harold-bot

# Install dependancies
cd $BUILDDIR/opt/harold-bot
npm install

# Am i building this on my mac with macports?
# Then include path to dpkg-deb
if [ -d "/opt/local/bin" ]; then
    PATH=$PATH:/opt/local/bin
    export PATH
fi

# Build the package
dpkg-deb --build $BUILDDIR

# Clean up
rm -rf $BUILDDIR
echo "Done."
