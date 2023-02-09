FROM node:16-alpine
ENV NODE_OPTIONS=--max_old_space_size=4096

# Set working directory
WORKDIR /app/master-class-admin-fe

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy all files
COPY ./ ./

# Build app
RUN yarn build

# Expose the listening port
EXPOSE 8086

# Run npm start script when container starts
CMD [ "yarn", "start" ]