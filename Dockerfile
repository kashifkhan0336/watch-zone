# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

EXPOSE 3000
# Creates a "dist" folder with the production build
ENTRYPOINT ["npm", "run"]