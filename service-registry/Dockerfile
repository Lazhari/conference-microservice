FROM node:12-alpine as base

EXPOSE 3000
WORKDIR /app
# Install tini 
RUN apk add --no-cache tini curl

ENV NODE_ENV=production
COPY package*.json ./
RUN npm config list \
  && npm ci \
  && npm cache clean --force

# Add node_modules bins to the the PATH
ENV PATH /app/node_modules/.bin:$PATH

ENTRYPOINT ["tini", "--"]
CMD ["npm", "start"]

FROM base as dev 
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["nodemon", "./bin/run", "--inspect=0.0.0.0:9229"]

FROM base as prod
COPY . .
CMD ["npm", "start"]
