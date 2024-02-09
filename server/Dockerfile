# Use a Node.js base image that includes npm
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# If you're compiling TypeScript to JavaScript, run the compilation here
# RUN npm run build

# Command to run your app, using ts-node if directly running TypeScript
CMD ["npx", "ts-node", "server.ts"]
