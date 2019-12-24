FROM node:12-alpine as base

# Agr definitions
ARG REGISTRY_HOST

# labels from https://github.com/opencontainers/image-spec/blob/master/annotations.md
LABEL org.opencontainers.image.authors=mlazhari@outlook.com
LABEL org.opencontainers.image.created=$CREATED_DATE
LABEL org.opencontainers.image.revision=$SOURCE_COMMIT
LABEL org.opencontainers.image.title="Conference App"
LABEL org.opencontainers.image.url=
LABEL org.opencontainers.image.source=https://github.com/Lazhari/conference-microservice
LABEL org.opencontainers.image.licenses=MIT
LABEL com.bretfisher.nodeversion=$NODE_VERSION

# Install tini 
RUN apk add --no-cache tini curl

ENV NODE_ENV=production
ENV REGISTRY_HOST $REGISTRY_HOST

EXPOSE 3080
WORKDIR /app
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
CMD ["nodemon", "./server", "--inspect=0.0.0.0:9229"]

FROM base as prod
COPY . .
CMD ["npm", "start"]
