FROM node:15.5.0-alpine as build

# Copy and install backend
WORKDIR /usr/src/app/backend
COPY backend/package*.json ./
COPY backend .
RUN npm ci


# Copy and install frontend
WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
COPY frontend ./
RUN npm ci

# Build App
WORKDIR /usr/src/app/backend
RUN npm run build

FROM node:15.5.0-alpine

WORKDIR /usr/src/app

COPY backend/package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/backend/dist ./dist
EXPOSE 8080

CMD npm run start:prod