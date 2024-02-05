# Use the official Node.js 14 as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle app source
COPY . .

# Map port
EXPOSE 3000

# Command to run the app
CMD ["node", "server.js"]
