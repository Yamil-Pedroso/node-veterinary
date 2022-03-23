//Node.js con Express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parce application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

require('dotenv').config();

const port = process.env.PORT || 3000;

// Conexión a la base de datos
const mongoose = require('mongoose');

//const user = 'yaminextgen';
//const password = '23pistachos';
//const DB = 'veterinaria'
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@yamnextgen.2niek.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true }
)  
    .then(() => console.log('DB is connected'))
    .catch(err => console.log(err));

// motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

//Rutas Web
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));

app.use((req, res, next) => {
    //res.render('404', {titulos404: '404 dinámicos'});
    res.status(404).render('404', {
        titulo404: '404 dinámico',
        description404: 'Página no encontrada'
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));








// Node.js puro
//const http = require('http');
//const server = http.createServer((req, res) => {
//    res.end("Respondiendo a tu solicitud v.4")
//});
//
//const port = 3000;
//server.listen(port, () => {
//    console.log(`Servidor corriendo en el puerto ${port}`);
//});


// Básicos
//const {frutas, dinero} = require('./frutas');
//const cowsay = require('cowsay');
//
//console.log(cowsay.say({
//    text : "I'm a moooodule",
//    e : "oO",
//    T : "U "
//}));
//
//frutas.forEach(fruta => {
//    console.count(fruta);
//})
//
//console.log(dinero);

