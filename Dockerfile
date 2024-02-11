# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Expose port 3000
EXPOSE 3000

# Define environment variable
ENV REACT_APP_API_URL=http://localhost:3001

# Build the app
RUN npm run build

# CMD to start the app
CMD ["npm", "start"]
