const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {titulo: 'Mi mundo dinámico'});
    //res.send('Hello World!')
});

router.get('/servicios', (req, res) => {
    res.render('servicios', {tituloServicios: 'Servicios dinámicos'});
    //res.send('Estamos en la página de servicio')
});

module.exports = router;