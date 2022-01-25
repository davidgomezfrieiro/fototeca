const req = require("express/lib/request");

let fotos = [];

exports.añadirNuevaImagen = (titulo, url, fecha, color) => {
    
    let imagen = {
        titulo,
        url,
        fecha,
        color
    };
    // color predominante obtenerlo aqui
    fotos.push(imagen);

    ordenarFotosDecre(fotos);
};

exports.existeImagenBD= (url) => {
    
    let encontrado = fotos.some(foto => url == foto.url);
    return encontrado;
    
};

exports.obtenerImagenes = () => {
    return fotos;
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