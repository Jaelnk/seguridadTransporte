const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Pantalla = require('../models/pantalla.model');
const Acceso = require('../models/acceso.model');
const Role = require('../models/role.model');
const Ruta = require('../models/rutas.model');

// Cargar las variables de entorno desde .env
dotenv.config();

// Conexión a la base de datos en MongoDB Atlas
mongoose
  .connect("mongodb+srv://JhaelDnk:hesoyam123@cluster0.jqdrnvh.mongodb.net/mydatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas - to seed'))
  .catch((error) => console.error(error));

// Datos de pantallas
const pantallasData = [
  {
    name: 'Registro',
    url: 'http://127.0.0.1:5173/register',
    detalle: 'registro de usuarios y su rol',
    state: 'active',
  },
  {
    name: 'pantallatest',
    url: 'http://127.0.0.1:5173/',
    detalle: 'test',
    state: 'active',
  },
  {
    name: 'agregar_pantalla_test',
    url: 'test',
    detalle: 'test1',
    state: 'active',
  },
];

const rutasData = [
    {
        sequencial: '1',
        codeRuta: 'ZXCVBNM',
        cliente: 'Empresa A',
        Contenedor: 'IDKCSJS123',
        referencia: '123456789',
        candado: "117",
        trayecto: "Guayaquil - Quito Machachi",
        destino: "G35 Machachi",
        fecha: "2023-07-21T02:03:16.897+00:00",
        ubicacion: "Santo domingo, parrakia n",
        ruta: "en ruta",
        estado: "1"
    },
    {
        sequencial: '2',
        codeRuta: 'ZXCVBNM',
        cliente: 'Empresa A',
        Contenedor: 'IDKCSJS123',
        referencia: '123456789',
        candado: "117",
        trayecto: "Guayaquil - Quito Machachi",
        destino: "G35 Machachi",
        fecha: "2023-07-21T04:05:16.897+00:00",
        ubicacion: "norte de quito",
        ruta: "parada de descanso",
        estado: "1"
    },
    {
        sequencial: '3',
        codeRuta: 'ZXCVBNM',
        cliente: 'Empresa A',
        Contenedor: 'IDKCSJS123',
        referencia: '123456789',
        candado: "117",
        trayecto: "Guayaquil - Quito Machachi",
        destino: "G35 Machachi",
        fecha: "2023-07-21T06:06:16.897+00:00",
        ubicacion: "norte de quito",
        ruta: "candado colocado",
        estado: "2"
    },
  ];



async function seed() {
  try {
    // Insertar datos de pantallas
    const savedPantallas = await Pantalla.insertMany(pantallasData);

    const savedRutas = await Ruta.insertMany(rutasData);

    // Obtener roles
    const roleFound1 = await Role.findOne({ name: 'administrador' });
    const roleFound2 = await Role.findOne({ name: 'test' });

    // Datos de accesos
    const accesosData = [
      {
        role: roleFound1._id,
        pantalla: savedPantallas[0]._id,
        state: 'active',
      },
      {
        role: roleFound1._id,
        pantalla: savedPantallas[1]._id,
        state: 'active',
      },
      {
        role: roleFound2._id,
        pantalla: savedPantallas[1]._id,
        state: 'active',
      },
      // Agrega más objetos de datos de accesos según sea necesario
    ];

    // Insertar datos de accesos
    const savedAccesos = await Acceso.insertMany(accesosData);

    console.log('Datos de pantallas y accesos cargados exitosamente.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al cargar los datos de pantallas y accesos:', error);
    mongoose.connection.close();
  }
}

seed();
