FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install --force

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]