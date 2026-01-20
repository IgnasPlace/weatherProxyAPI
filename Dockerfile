FROM node:24-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV PORT=4010

CMD ["node", "index.js"]
EXPOSE 4010