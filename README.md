# Minimal Starter with Angular on both Server and Browser Platforms

## Run CentOS container with Angular pre-installed:
```sh
docker run -it -p 8000:8000 -v $(pwd):/localdir oveits/angular_hello_world:centos bash
```
## Clone this Repo
```sh
git clone https://github.com/oveits/ng-universal-demo
```
## Install Dependencies
```sh
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

