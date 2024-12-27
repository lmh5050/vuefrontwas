# Step 1: Build Vue Project
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build

# Step 2: Create Nginx Server
FROM nginx:stable-alpine as production-stage

# Copy custom Nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy the build files to the Nginx html folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for external access
EXPOSE 80

# Nginx를 백그라운드로 실행
CMD ["nginx", "-g", "daemon off;"]
