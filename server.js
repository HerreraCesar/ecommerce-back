import { errors } from './controllers/errors.js';
import express from 'express'
import routerCart from './routes/cart.js';
import routerProducts from './routes/products.js';

const app = express()

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routerProducts)
app.use('/api/carrito', routerCart)
app.use('*', errors)

const PORT = process.env.PORT || 8080;

const server = app.listen( PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on('error', error => console.log(`Error en el servidor ${error}`))
