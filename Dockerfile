FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production && npm install pm2 -g

# Copy the rest of the application code
COPY . .

# Exclude .env file from the image
RUN rm -f .env

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application using pm2
CMD [ "pm2-runtime", "start", "app.js" ]
