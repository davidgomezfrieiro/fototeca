
const { añadirNuevaImagen, existeImagenBD, obtenerImagenes } = require('../models/imagen')
const { getColorFromURL } = require('color-thief-node');
const { ordenarFotosDecre } = require('../models/imagen')

exports.getAllImages = function (req, res) {

    let fotos = obtenerImagenes()

    res.render("index", {
        numFotos: fotos.length,
        fotos, // si la propiedad del objeto y el valor de donde la obtienes se llaman igual; no hace falta fotos:fotos
        path: req.route.path
    });
}

exports.getNewImage = (req, res) => {
    res.render("form", {
        error: ""
    });
};

exports.postNewImage = async (req, res) => {
    // Antes de actualizar la base de datos vamos a comprobar si la foto ya existe
    // Una foto ya existe si hay un obejto en fotos que tenga la url que pretendemos insertar
    let { title:titulo, url, fecha} = req.body;
    let fotoExiste = existeImagenBD(url)
    if (fotoExiste) {
        //Devolver al usuario a la pagina del formulario indicando que la url ya existe
        res.status(409).render( "form", {
            error: `La URL ${req.body.url} ya existe`
            
        })
        return;
    }
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
    
    añadirNuevaImagen(titulo, url, fecha, color)
    //fotos.push(foto);


    res.status(201)
    
    // 3. redirigir al usuario a la página principal
    res.redirect('/')


};

async function colorDominante(imageURL) {
    const dominantColor = await getColorFromURL(imageURL);
    color = dominantColor
    return dominantColor;
};