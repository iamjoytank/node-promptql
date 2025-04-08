# Use Node.js base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install -g pnpm

RUN npm install --only=production

# Copy server code
COPY . .

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "app.js"]