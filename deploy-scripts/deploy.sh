#!/bin/bash

#  How to execute.
# export DEPLOY_SSH_PEMURL="https://foo.com/"
# export DEPLOY_SSH_FINGERPRINT="0.0.0.0 ecdsa-sha2-nistp256 ~"
# export DEPLOY_SSH_USER=foo
# export DEPLOY_SSH_HOST="0.0.0.0"
# export DEPLOY_APP_PORT=0
# export DOCKER_USER=foo
# export DOCKER_TAG=foo
# ./deploy.sh


echo Set default values into empty variables.
if [ -z $DEPLOY_APP_PORT ]; then
    default=80
    echo "  "Set DEPLOY_APP_PORT=${default}
    DEPLOY_APP_PORT=$default
fi
if [ -z $DOCKER_TAG ]; then
    default=latest
    echo "  "Set DOCKER_TAG=${default}
    DOCKER_TAG=$default
fi

echo Check Script environment variables.
NUM_OF_VARIABLES_TO_CHECK=7
VARIABLES_TO_CHECK=(\
$DEPLOY_SSH_PEMURL \
"$DEPLOY_SSH_FINGERPRINT" \
$DEPLOY_SSH_USER \
$DEPLOY_SSH_HOST \
$DEPLOY_APP_PORT \
$DOCKER_USER \
$DOCKER_TAG \
)

if [ $NUM_OF_VARIABLES_TO_CHECK -ne ${#VARIABLES_TO_CHECK[@]} ]
then
    echo "  "Add Environment Variables before running script. With export statements.
    echo "  "Number of variables. Expected $NUM_OF_VARIABLES_TO_CHECK, Actual ${#VARIABLES_TO_CHECK[@]}
    echo "  "DEPLOY_SSH_PEMURL, DEPLOY_SSH_FINGERPRINT, DEPLOY_SSH_USER, \
      DEPLOY_SSH_HOST, DEPLOY_APP_PORT, DOCKER_USER, \
      DOCKER_TAG required.
    exit 1
fi


PEMFILE=key.pem
if [ ! -f "$PEMFILE" ]; then
  wget -O $PEMFILE $DEPLOY_SSH_PEMURL
  chmod 0400 $PEMFILE
else
  echo "$PEMFILE is already exists."
fi

echo $DEPLOY_SSH_FINGERPRINT >> ~/.ssh/known_hosts

ssh -i $PEMFILE $DEPLOY_SSH_USER@$DEPLOY_SSH_HOST \
  DOCKER_TAG=$DOCKER_TAG \
  DOCKER_USER=$DOCKER_USER \
  DEPLOY_APP_PORT=$DEPLOY_APP_PORT \
  DOCKER_TAG=$DOCKER_TAG \
  'bash -s' << 'DEPLOY'
    APPNAME=todayileanred
    sudo docker system prune -af
    sudo docker pull $DOCKER_USER/todayileanred:$DOCKER_TAG
    set +e
    sudo docker kill $APPNAME
    sudo docker rm $APPNAME
    set -e
    echo docker run -d \
               -p $DEPLOY_APP_PORT:3000 \
               --name $APPNAME \
               $DOCKER_USER/todayilearned:$DOCKER_TAG
    sudo docker run -d \
      -p $DEPLOY_APP_PORT:3000 \
      --name $APPNAME \
      $DOCKER_USER/todayilearned:$DOCKER_TAG
