FROM node:19.2.0

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm install -g @angular/cli

COPY . .
EXPOSE 4200
CMD ng serve --host 0.0.0.0
