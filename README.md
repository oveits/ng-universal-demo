# Minimal Starter with Angular on both Server and Browser Platforms

## Run CentOS container with pre-installed Angular and NodeJS:
If you do not want to install Angular, you can also run a docker image with pre-installed angular and node:
```sh
docker run -it -p 8000:8000 -v $(pwd):/localdir oveits/angular_hello_world:centos bash
```
## Clone this Repo (will be placed on docker host, since we have mapped a volume)
```sh
cd /localdir
git clone https://github.com/oveits/ng-universal-demo
```
## Install Dependencies
```sh
cd ng-universal-demo
npm i
```
## Get Started
```sh
npm run start
```
Then connect to http://localhost:8000 in a browser

#  Not tested yet:
## Developement mode
* Terminal 1: ```npm run watch```
* Wait for the build to finish
* Terminal 2: ```npm run server```

## Prod mode
Includes AoT
```sh
npm run build:prod
npm run server
```

Based on https://github.com/robwormald/ng-universal-demo

