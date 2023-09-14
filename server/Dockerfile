FROM node:alpine AS development
ENV NODE_ENV development
WORKDIR /app
COPY ./package.json /app
RUN npm install --silent
COPY . .
EXPOSE 3001
CMD node index.js