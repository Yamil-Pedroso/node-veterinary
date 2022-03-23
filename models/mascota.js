const mongoose = require('mongoose');
const { Schema } = mongoose;

const mascotaSchema = new Schema({
    nombre: { type: String, required: true },
    description: { type: String, required: true },
   
});

// Crear modelo
const Mascota = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascota;
