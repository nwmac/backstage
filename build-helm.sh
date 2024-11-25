#!/usr/bin/env bash

echo "Building Helm Chart"

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
# Script is in top-level folder
BASE_DIR=$SCRIPT_DIR

TMP_DIR=${BASE_DIR}/tmp

echo $BASE_DIR
echo $TMP_DIR

rm -rf ${TMP_DIR}
mkdir ${TMP_DIR}

mkdir -p ${BASE_DIR}/charts

VERSION=0.1.0

helm package ${BASE_DIR}/helm/chart --version=${VERSION} --app-version=${VERSION} -d ${BASE_DIR}/charts

BASE_URL=https://raw.githubusercontent.com/nwmac/portal/refs/heads/main/charts

helm repo index ${BASE_DIR}/charts --url=${BASE_URL}
mv ${BASE_DIR}/charts/index.yaml ${BASE_DIR}/index.yaml
rm -rf ${TMP_DIR}
