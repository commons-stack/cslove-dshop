#!/bin/bash
################################################################################
## Usage:
##  dshop_backend_build.sh <tag>
################################################################################

realpath() {
  OURPWD=$PWD
  cd "$(dirname "$1")"
  LINK=$(readlink "$(basename "$1")")
  while [ "$LINK" ]; do
    cd "$(dirname "$LINK")"
    LINK=$(readlink "$(basename "$1")")
  done
  REALPATH="$PWD/$(basename "$1")"
  cd "$OURPWD"
  echo "$REALPATH"
}

PWD="$(pwd)"
DIR="$(realpath "$(dirname "${BASH_SOURCE[0]}")")"
CONTEXT="$(realpath $DIR/..)"
PROJECT_ID="origin-cs-001"
DOCKERFILE="$DIR/Dockerfile"
NAME="dshop-cs-backend"
NAMESPACE="experimental"
TAG=$(date +'%Y%m%d%H%M%s')

ENVIRONMENT="production"

if [[ -z "$ENVKEY" ]]; then
  # Not really currently used but might be in the future
  echo "INFO: ENVKEY is not defined"
fi

# Use arg as tag if given
if [[ -n "$1" ]]; then
  TAG="$1"
fi

echo "CONTEXT: $CONTEXT"

# TODO: Remove above and --no-cache
docker build \
    -f "$DOCKERFILE" \
    -t "registry.gitlab.com/commonsstacklove/cs-dshop:$TAG" \
    --build-arg ENVKEY="$ENVKEY" \
    --build-arg ENVIRONMENT="$ENVIRONMENT" \
    $CONTEXT && \
docker push "registry.gitlab.com/commonsstacklove/cs-dshop:$TAG"
# gcloud auth configure-docker && \
# docker push "gcr.io/$PROJECT_ID/$NAMESPACE/$NAME:$TAG" && \
# gcloud container images add-tag \
#     "gcr.io/$PROJECT_ID/$NAMESPACE/$NAME:$TAG" \
#     "gcr.io/$PROJECT_ID/$NAMESPACE/$NAME:latest" \
#     --quiet

if [[ $? -ne "0" ]]; then
  echo "Build failed"
  exit 1
fi

cd $PWD
