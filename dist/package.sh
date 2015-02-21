#!/bin/bash

set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APPNAME="haroldbot"

display_help() {
    echo "Usage: package.sh <major version>.<minor version>-<package revision>"
    echo "Example: package.sh 1.0-1"
}

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

# Create build directory
BUILDDIR="$DIR/$APPNAME"
BUILDDIR+="_$1"
mkdir $BUILDDIR
cp -r $DIR/DEBIAN $BUILDDIR

# Update the version
sed -i -e "s|_VERSION_|$1|" $BUILDDIR/DEBIAN/control

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
