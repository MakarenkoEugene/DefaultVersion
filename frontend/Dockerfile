FROM node:16-alpine

# Create app directory
RUN mkdir -p /${PROJECT_NAME}/frontend
WORKDIR /${PROJECT_NAME}/frontend

COPY package.json package-lock.json ./
RUN npm install --silent

ENV PATH /${PROJECT_NAME}/frontend/node_modules/.bin:$PATH

COPY webpack.config.js babel.config.js tsconfig.json ./
COPY public ./public
# Is connected from volume
COPY src ./src

EXPOSE 3000