# Build stage
FROM node:14 as build-stage
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY ./ .
# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
# Copy built assets from build-stage to nginx serve directory
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Expose port 80 for the web server
EXPOSE 80
# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
