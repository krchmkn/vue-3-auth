FROM node:18-alpine
WORKDIR /app
COPY . /app

# This block is required 
# because the npm module is not published.
# Package stored in ./npm_package
RUN cd ./npm_package
RUN npm i
RUN npm link
RUN cd ..
RUN npm link npm_package
# end

RUN npm i
RUN npm run build

CMD ["npm", "run", "preview"]
