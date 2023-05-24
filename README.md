## Overview

My basic workflow settings are on the example of a to-do list. Includes settings among development, docker compos for cross-platform development, all changes in working directories get into the container when updating dependencies, need to build the container. Env variables are common for all containers.

Workflow:
- Docker
- typescript
- prettier
- Eslist

Containers: 
- DB: MongoDB
- Server: Express, Mongoose
- Web: Webpack, React

## Quick start

Pull repo:
```shell
git clone https://github.com/MakarenkoEugene/todo.git
```

copy .env.example file to .env. Change variable `PROJECT_NAME` if needed
```shell
cp .env.example .env
```

Build docker image. Make sure docker is installed.
```shell
docker-compose -f docker-compose.dev.yml build
```

Run docker container. `–d` flag in docker run command, means that a Docker container runs in the background of your terminal.
```shell
docker-compose -f docker-compose.dev.yml up -d
```

The server running on port 3001. The web server is running on port 3000

For the right working IDE. install node_modules to the local machine.
```shell
cd ./backend && npm install && cd ..
cd ./frontend && npm install && cd ..
```
or 
```shell
cd ./backend; npm install; cd ..
cd ./frontend; npm install; cd ..
```
`npm run install --prefix ./frontend` Didn't work for me.