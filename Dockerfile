FROM node:18-alpine AS development
WORKDIR /usr/src/app
COPY ./cat-api/package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY  ./cat-api/ ./
RUN npm run prisma:generate
RUN npm run build
CMD [ "npm", "run", "start:dev" ]