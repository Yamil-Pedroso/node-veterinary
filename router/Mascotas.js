const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota')

router.get('/', async (req, res) => {
    try {

        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)

        res.render("mascotas",{arrayMascotas: arrayMascotasDB}) 
    } catch (err) {
        console.log(err.message)
    }
    
});

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        //const mascotaDB = new Mascota(body) // Método #1 para crear una mascota
        //await mascotaDB.save()

        await Mascota.create(body) // Método #2 para crear una mascota

        res.redirect('/mascotas')
    } catch (err) {
        console.log(err.message)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const mascotaDB = await Mascota.findOne({ _id: id })
        console.log(mascotaDB)
        res.render('detalle', { 
            mascota: mascotaDB,
            err: false 
        })
    } catch (err) {
        console.log(err.message)
        res.render('detalle', { 
            err: true,
            mensaje: 'No se encuentra el id seleccionado' 
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id})
        if(mascotaDB) {
            res.json({
                estado: true,
                mensaje: 'Mascota eliminada'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'No se encuentra el id seleccionado'
            })
        }
    } catch (err) {
        console.log(err.message)
    }
})

router.put('/:id', async (req, res) => {
    const id =  req.params.id
    const body = req.body
    try {
        const mascotaDB = await Mascota.findByIdAndUpdate({_id: id}, body,  {useFindAndModify: false})
        console.log(mascotaDB)
        res.json({
            estado: true,
            mensaje: 'Mascota actualizada'
        })
    } catch (err) {
        console.log(err.message)
        res.json({
            estado: false,
            mensaje: 'No se encuentra el id seleccionado'
        })

    }
})

module.exports = router

// Base de datos estática para testear
//arrayMascotas: [
//    {
//        id: 'cdcdcd',
//        nombre: 'milo',
//        description: 'milo description'
//    },
//    {
//        id: 'aiaiai',
//        nombre: 'loli',
//        description: 'loli description'
//    }
//]