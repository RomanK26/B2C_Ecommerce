# Use Node.js base image
FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Start development server
CMD ["npm","run", "dev" ,"--", "--host"]