FROM node:21.4.0 as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build

FROM nginx
COPY --from=build /app/dist /var/www/html 
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf