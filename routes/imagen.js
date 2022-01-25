const express = require('express')

// Instancia un nuevo objeto del tipo routes

const router = express.Router()

// Importar las funciones del controlador de esta misma entidad 'imagen'
const { getAllImages, getNewImage, postNewImage } = require('../controllers/imagen')

// Registrar la ruta "/" que va a mostrar el listado total de imagen
router.get('/', getAllImages);

router.get('/anadir', getNewImage); 

router.post('/anadir', postNewImage);

module.exports = router;
// Equivalente a exports.router = router