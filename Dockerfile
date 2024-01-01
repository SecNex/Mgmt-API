# Docker build

FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV API_HOST = "0.0.0.0"

# EXPOSE ENV PORT
EXPOSE 3000

CMD ["npm", "start"]