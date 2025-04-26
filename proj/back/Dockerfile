# Use an official Node.js base image with Python installed
FROM node:20-bullseye

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Set the working directory inside container
WORKDIR /app

# Copy package.json and install Node.js dependencies
COPY proj/back/package*.json ./
RUN npm install

# Copy your backend code
COPY proj/back .

# Copy dataset and chatbot folders into container
COPY dataset ./dataset
COPY chatbot ./chatbot

# Install Python dependencies if you have a requirements.txt inside Recommendation/
RUN pip install -r Recommendation/requirements.txt || true

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
