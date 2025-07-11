FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production


COPY dist ./dist

CMD ["node", "dist/main.js"]