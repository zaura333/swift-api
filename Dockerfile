# Use an official Node.js runtime as a parent image
FROM node:22.14.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the entrypoint script
COPY init.sh /usr/local/bin/init.sh

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/init.sh

# Create the data directory
RUN mkdir -p /data

# Ensure the data directory is writable
RUN chmod -R 777 /data

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/init.sh"]

# Command to run your application
CMD ["node", "dist/src/index.js"]