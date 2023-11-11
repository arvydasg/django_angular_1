# Use the official Node.js LTS image as a base image
FROM node:lts

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the contents of the local src directory to the working directory
COPY . .

# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Expose port 4200
EXPOSE 4200

# Start the application with --host 0.0.0.0 to allow external connections
CMD ["ng", "serve", "--host", "0.0.0.0"]
