# Usa la imagen de Node.js como base
FROM node:16.13.0 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y los archivos del proyecto
COPY package*.json ./
COPY . .

# Instala las dependencias y construye la versión de producción
RUN npm install --force
RUN npm run build 

# Crea una nueva imagen y copia los archivos generados usando la última versión de nginx
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/proyecto /usr/share/nginx/html
EXPOSE 80
