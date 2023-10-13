FROM node:alpine

ENV PORT 80

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

# Building app
RUN npm run build
EXPOSE 80
ENTRYPOINT ["npm", "start"]
