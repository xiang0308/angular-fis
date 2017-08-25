#!/bin/bash

MOD_NAME="cms"
TAR="$MOD_NAME.tar.gz"
STATIC_MODULE="mirror_static"
STATIC_TAR="static-$MOD_NAME.tar.gz"

ENV=$2

fisa -v

rm -rf output

echo current $ENV

fisa release -cuompd $ENV

cd output

mkdir webroot

mv $STATIC_MODULE webroot/

tar czf $TAR ./*

rm -rf webroot

echo "build end"
