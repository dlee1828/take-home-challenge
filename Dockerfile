FROM node:16
WORKDIR /usr/src/app
COPY . .
RUN yarn install
EXPOSE 4000
CMD [ "yarn", "start" ]