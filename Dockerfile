# Use the official Node.js image
FROM node:22.14.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["sh", "-c", "npm run build && npm run setup-db && npm run start"]
