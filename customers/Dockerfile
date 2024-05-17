# uses the official Node.js 16 image as the base image.
FROM node:16

# sets the working directory inside the container to /app.
WORKDIR /app

# copies the package.json and package-lock.json files to the working directory.
COPY package*.json ./

# installs the application dependencies.
RUN npm install

# opies the rest of the application code to the working directory.
COPY . .


# This line exposes port 3000 on the container. This doesn't actually publish the port; it just informs Docker 
# that the container will listen on this port at runtime.
EXPOSE 8002


# specifies the command to run the application.
CMD ["npm", "start"]
