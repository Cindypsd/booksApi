const crypto = require('crypto');
const fs = require('fs');

// Generar una clave secreta aleatoria
const secretKey = crypto.randomBytes(32).toString('hex');

// Leer el archivo .env existente
const envData = fs.readFileSync('.env', 'utf8');

// Construir la nueva línea con la clave secreta
const newEnvLine = `SECRET_KEY=${secretKey}`;

// Agregar la nueva línea al contenido existente
const newEnvContent = envData.trim() + '\n' + newEnvLine;

// Escribir el contenido actualizado en el archivo .env
fs.writeFileSync('.env', newEnvContent);
