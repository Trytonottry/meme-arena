# =========================
# 🏗 STAGE 1: Build
# =========================
FROM node:18-alpine AS build

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники
COPY . .

# Сборка фронтенда
RUN npm run build

# =========================
# 🚀 STAGE 2: Run
# =========================
FROM nginx:stable-alpine

# Копируем собранное приложение
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
