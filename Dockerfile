FROM node as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM nginx

COPY --from=build-step /app/dist/isis /usr/share/nginx/html

RUN rm -rf /app