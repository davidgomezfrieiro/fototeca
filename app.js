// Importamos la biblioteca de terceros 'express'
const express = require('express');
const { json } = require('express/lib/response');
const req = require('express/lib/request');

// Importar todas las rutas
const imagesRoutes = require('./routes/imagen')

// Crear una nueva instancia del objeto Express
const app = express();

// "Base de datos" de las fotos que me han subido al servidor
//let fotos = [];

// Configuro el color del titulo

let colorTitulo = "#467389";

// Si te vienen peticiones POST; procesalas adecuadamente (enriquece el objeto req con la propiedad body)
app.use(express.urlencoded({ extended: false }))

// Ofrece una carpeta en el servidor para poder 'colgar' todos los recursos que deben ser accedidos sin reestrición y de manera directa por parte del cliente
app.use(express.static('public'));

// el método .set modifica una característica de nuestro servidor. Mi motor por defecto de plantillas va a ser EJS
app.set('view engine', 'ejs');

// Registro todas las rutas en el app

app.use(imagesRoutes);


// Define un endpoint a la URL '/', método GET, y ejecutrá la función de callback del segundo parámetro cada vez que reciba una petición


async function colorDominante(imageURL) {
    const dominantColor = await getColorFromURL(imageURL);
    color = dominantColor
    return dominantColor;
};
// endpoint recibir peticiones de tipo POST a '/nueva-foto'; y de momento, simplemente hacer un console.log del objeto req.body


app.listen(3000);