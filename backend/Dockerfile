FROM node:16-alpine

# Create app directory
RUN mkdir -p /${PROJECT_NAME}/backend
WORKDIR /${PROJECT_NAME}/backend

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --silent

ENV PATH /${PROJECT_NAME}/backend/node_modules/.bin:$PATH

# Is connected from volume
COPY src ./src

EXPOSE 3001
