# Usa la imagen de Node.js como base
FROM node:16.13.0 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copy package.json
COPY package*.json ./
COPY . .

# Instala las dependencias y compila el proyecto
RUN npm install

# Expose port 3000
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "run", "start"]