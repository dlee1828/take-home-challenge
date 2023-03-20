FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn install
EXPOSE 4000
CMD [ "yarn", "start" ]