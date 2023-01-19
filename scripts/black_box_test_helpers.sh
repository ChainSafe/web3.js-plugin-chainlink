#!/usr/bin/env bash

ORIGARGS=("$@")

helpFunction() {
	echo "Usage: $0 [start|stop|startBackgroundAndPublish|runTests] [background]"
	exit 1 # Exit script after printing help
}

start() {
	. scripts/env.sh
	if [[ ${ORIGARGS[1]} == "background" ]]; then
        startBackground
	else
		echo "Starting verdaccio..."
        docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
	fi
}

startBackground() {
    echo "Starting verdaccio in background..."
    docker run -d --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
}

stop() {
	echo "Stopping verdaccio ..."
    docker ps -q --filter ancestor="verdaccio/verdaccio" | xargs -r docker stop
}

createVerdaccioNPMUser() {
    curl -XPUT \
        -H "Content-type: application/json" \
        -d '{ "name": "test", "password": "test" }' \
        'http://localhost:4873/-/user/org.couchdb.user:test'
}

loginNPMUser() {
    npx npm-auth-to-token \
        -u test \
        -p test \
        -e test@test.com \
        -r http://localhost:4873
}

yarnPublish() {
    yarn publish \
        --new-version 9.9.9 \
        --no-git-tag-version \
        --tag blackbox \
        --registry http://localhost:4873
}

publish() {
    echo "Publishing to verdaccio ..."

    npx wait-port -t 60000 4873

    createVerdaccioNPMUser
    loginNPMUser
    yarn build
    yarnPublish
}

startBackgroundAndPublish() {
    startBackground && publish
}

runTests() {
    cd test/black_box
    yarn --update-checksums
    yarn install
    yarn test
}

case $1 in
start) start ;;
stop) stop ;;
startBackgroundAndPublish) startBackgroundAndPublish ;;
runTests) runTests ;;
*) helpFunction ;; # Print helpFunction in case parameter is non-existent
esac
