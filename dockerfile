# Use the official Node.js image
FROM --platform=linux/amd64 node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set the NODE_ENV environment variable
ENV NODE_ENV=production

# Run database migrations and then start the application

CMD ["sh", "-c", "node .output/server/index.mjs"]
