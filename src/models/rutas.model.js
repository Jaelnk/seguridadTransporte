const mongoose = require('mongoose');

const rutaSchema = new mongoose.Schema({
  sequencial: { type: String, required: true },
  codeRuta: { type: String, required: true },
  cliente: { type: String, required: true },
  Contenedor: { type: String, required: true },
  referencia: { type: String, required: true },
  candado: { type: String, required: true },
  trayecto: { type: String, required: true },
  destino: { type: String, required: true },
  fecha: { type: Date, required: true },
  ubicacion: { type: String, required: true },
  ruta: { type: String, required: true },
  estado: { type: String, required: true },
});

const Ruta = mongoose.model('Ruta', rutaSchema);

module.exports = Ruta;
