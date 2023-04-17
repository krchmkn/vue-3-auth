FROM node:18-alpine
WORKDIR /app
COPY . /app

RUN cd ./npm_package
RUN npm i
RUN npm link
RUN cd ..
RUN npm link npm_package

RUN npm i
RUN npm run build

CMD ["npm", "run", "preview"]