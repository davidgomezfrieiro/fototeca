// Importamos la biblioteca de terceros 'express'
const express = require('express');
const { json } = require('express/lib/response');
const { getColorFromURL } = require('color-thief-node');
const req = require('express/lib/request');

// Crear una nueva instancia del objeto Express
const app = express();

// "Base de datos" de las fotos que me han subido al servidor
let fotos = [];

// Configuro el color del titulo

let colorTitulo = "#467389";

// Si te vienen peticiones POST; procesalas adecuadamente (enriquece el objeto req con la propiedad body)
app.use(express.urlencoded({ extended: false }))

// Ofrece una carpeta en el servidor para poder 'colgar' todos los recursos que deben ser accedidos sin reestrición y de manera directa por parte del cliente
app.use(express.static('public'));

// el método .set modifica una característica de nuestro servidor. Mi motor por defecto de plantillas va a ser EJS
app.set('view engine', 'ejs');


// Define un endpoint a la URL '/', método GET, y ejecutrá la función de callback del segundo parámetro cada vez que reciba una petición

app.get('/', function (req, res) {
    res.render("index", {
        numFotos: fotos.length,
        fotos, // SI la propiedad y el objeto se llaman igual lo puedes dejar asi
        colorTitulo
    });
    
})

app.get('/anadir', (req, res) => {
    res.render("form", {
        error: ""
    });
});
async function colorDominante(imageURL) {
    const dominantColor = await getColorFromURL(imageURL);
    color = dominantColor
    return dominantColor;
};
// endpoint recibir peticiones de tipo POST a '/nueva-foto'; y de momento, simplemente hacer un console.log del objeto req.body
app.post('/anadir', async (req, res) => {
    // 1 Crear un nuevo objeto que almacene los campos de la foto
    //console.log(req.body);
    let colorMain = await colorDominante(req.body.url)
    let foto = {
        titulo: req.body.title,
        url: req.body.url,
        fecha: req.body.date,
        color: colorMain
    }
    console.log(foto);
    // Antes de actualizar la base de datos vamos a comprobar si la foto ya existe
    // Una foto ya existe si hay un obejto en fotos que tenga la url que pretendemos insertar
    
    let fotoExiste = existeFotoBD(req.body.url)
    if (fotoExiste) {
        //Devolver al usuario a la pagina del formulario indicando que la url ya existe
        res.status(409).render( "form", {
            error: `La URL ${req.body.url} ya existe`
            
        })
        return;
    }
    
    
    // 2 Añadir el objeto al array fotos
    fotos.push(foto);

    ordenarFotosDecre(fotos)

    res.status(201)
    
    // 3. redirigir al usuario a la página principal
    res.redirect('/')


});
/**
 * Funcion que determina si existe unafoto en la base de datos 'fotos'
 * @param {string} url URL de la foto que quieres comprobar
 */
function existeFotoBD(url){
    
    let encontrado = fotos.some(foto => url == foto.url)
    return encontrado;
    
}

function ordenarFotosDecre(fotos) {
    // Si la fecha de la foto1 es mayor que la fecha de la foto2 (es más actual); debería ir más al principio
        // Más al principio significa que tenemos que devolver un número negativo (-1)
    fotos.sort((foto1,foto2) => {

        if (foto1.fecha > foto2.fecha) {
            return -1;
        }
        else if (foto2.fecha > foto1.fecha) {
            return 1;
        }
        return 0;
    })
}

app.listen(3000);