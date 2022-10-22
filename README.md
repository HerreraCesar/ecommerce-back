# Ecommerce

Backend de ecommerce realizado durante el desarrollo del curso de Programación Backend de [Coderhouse](https://www.coderhouse.com/).
Para ver el repositorio del frontend haga [clic aquí](https://github.com/HerreraCesar/ecommerce-front)

## Índice <a name="indice"></a>

- [Autor](#1)
- [Demo Backend](#2)
- [Demo Frontend](#3)
- [Dependencias](#4)
- [Variables de entorno](#5)
- [¿Como usar la aplicación de forma local?](#6)

## Autor: *César Herrera* <a name="1"></a>

* **[GitHub](https://github.com/HerreraCesar/)**
* **[LinkedIn](https://www.linkedin.com/in/herrera-cesar/)**
* **[Website](https://herreracesar.site/)**

## Demo Backend <a name="2"></a>

Conocé el backend de la app en funcionamiento haciendo [clic aquí](https://ecommerce-mitienda.herokuapp.com/).

## Demo Frontend <a name="3"></a>

Conocé el frontend de la app en funcionamiento haciendo [clic aquí](https://ecommerce-mitienda.netlify.app/).

## Dependencias: <a name="4"></a>

- [Node.js](https://nodejs.org/es/)
- [Express.js](https://expressjs.com/es/)
- [MongoDB](https://www.mongodb.com/)
- [Handlebars](https://handlebarsjs.com/)
- [JWT](https://jwt.io/)
- [Nodemailer](https://nodemailer.com/about/)
- [Passport](https://www.passportjs.org/)
- [Socket.IO](https://socket.io/)
- [Winston](https://github.com/winstonjs/winston#readme)

## Variables de entorno <a name="5"></a>

Deben ser cargadas en un archivo denominado `.env.production` o `.env.development`. El entorno se define mediante argumentos de linea de comando. Las variables a definir son:

`PERSISTENCE=` Ubicación de la base de datos. Opciones válidas: json, memory o mongo (requiere MONGO_CONNECTION_STRING). (OBLIGATORIO)

`MONGO_CONNECTION_STRING=` String de conexión con la base de datos. (depende de la persistencia, puede ser local o remoto)

`PORT=` Define el puerto en el que va a correr la aplicación. (OPCIONAL)

`MODE=` Define el modo de ejecución del servidor. Opciones válidas:  fork y cluster. (OPCIONAL)

`EMAIL=` Email utilizado para el envío de correos desde la aplicación. (OBLIGATORIO)

`EMAIL_PASSWORD=` Contraseña del email. (OBLIGATORIO)

## ¿Como usar la aplicación de forma local? <a name="6"></a>

Este proyecto requiere **[Node.js](https://nodejs.org/)** para su ejecución.

```
git clone https://github.com/HerreraCesar/ecommerce.git
```
```
cd ecommerce
```
```
npm install
```
```
npm start
```

[Volver al índice](#indice)