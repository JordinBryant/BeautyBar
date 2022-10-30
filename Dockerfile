FROM node:16
RUN mkdir /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]
# FROM node:12-alpine
# RUN apk add --no-cache python2 g++ make
# WORKDIR /app
# COPY . .
# RUN yarn install --production
# CMD ["node", "src/index.js"]
# EXPOSE 3000