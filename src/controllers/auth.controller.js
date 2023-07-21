const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const Pantalla = require('../models/pantalla.model.js');
const Acceso = require('../models/acceso.model.js');
const Ruta = require('../models/rutas.model');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { TOKEN_SECRET } = require("../config.js");
const { createAccessToken } = require("../libs/jwt.js");
const cookie = require("cookie");

exports.register = async (req, res) => {
  try {
    const { username, email, password, nombre, apellido, dni, telf, estado, roleName } = req.body;
    const userFound = await User.findOne({ email });

    // Buscar el rol por nombre
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(404).json({ message: 'El rol no existe' });
    }

    if (userFound) {
      return res.status(400).json({
        message: ["The email is already in use"],
      });
    }

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      nombre,
      apellido,
      dni,
      telf,
      estado,
      role: role._id
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, 
    {
      httpOnly: true,
      secure: true, // Agrega esta línea para establecer el atributo "Secure"
      sameSite: "none",
    }
    /* , {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    } */);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      nombre: userSaved.nombre,
      apellido: userSaved.apellido,
      dni: userSaved.dni,
      telf: userSaved.telf,
      estado: userSaved.estado,
      id_role: userSaved.id_role,
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, 
    {
      httpOnly: true,
      secure: true, // Agrega esta línea para establecer el atributo "Secure"
      sameSite: "none",
    }  
      /* httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "l  ax", */
    );

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.index = async (req, res) => {
  try{


/*     const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);
 */

    const { token } = req.cookies;
    if (!token) return res.json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {

      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      // Buscar el usuario por id
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);
      //console.log("usuario", userFound)
      // Buscar el rol por nombre
      const roleFound = await Role.findById (userFound.role);
      if (!roleFound) return res.sendStatus(401).json({ message: "rol invalido" });
      //console.log(roleFound);
      
      // Buscar el acceso por el ID del rol
      /* const accesoFound = await Acceso.findOne({ role: roleFound._id });
      if (!accesoFound) return res.sendStatus(401); */
      // Buscar los accesos por el ID del rol
      const accesosFound = await Acceso.find({ role: roleFound._id });

      if (!accesosFound || accesosFound.length === 0) return res.json({ message: "acceso invalido", acceso: accesosFound });;
      //console.log(accesosFound);

      /* const pantallasNames = [];
      for (const acceso of accesosFound) {
        const pantallaFound = await Pantalla.findById(acceso.pantalla);
        if (pantallaFound) {
          pantallasNames.push(pantallaFound.name);
        }
      } */

      const pantallasInfo = [];
      for (const acceso of accesosFound) {
        const pantallaFound = await Pantalla.findById(acceso.pantalla);
        if (pantallaFound) {
          pantallasInfo.push({
            name: pantallaFound.name,
            url: pantallaFound.url,
          });
        }
      }
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        pantallas: pantallasInfo,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      cookies: req.cookies
    });
  });
};

exports.viewRoutes = async (req, res) =>{
  const { token } = req.cookies;
  if (!token) return res.json({ message: "No token, authorization denied" });

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401).json({ message: "Token is not valid" });;

   /*  const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401).json({ message: "user not found" });; */

    const rutas = await Ruta.find({ codeRuta: 'ZXCVBNM' });
    if (!rutas) return res.sendStatus(401).json({ message: "rol invalido" });

    return res.json({ rutas });

  });
}






exports.logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
 




/* 
// Método para cargar datos de pantallas y accesos
exports.loadPantallasAndAccesos = async (req, res) => {
  try {
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
      }
      // Agrega más objetos de datos de pantallas según sea necesario
    ];

    const savedPantallas = await Pantalla.insertMany(pantallasData);

    // Datos de accesos
    const roleFound1 =await Role.findOne({name: "administrador"})
    const roleFound2 =await Role.findOne({name: "test"})
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

    const savedAccesos = await Acceso.insertMany(accesosData);

    res.json({
      message: 'Datos de pantallas y accesos cargados exitosamente',
      pantallas: savedPantallas,
      accesos: savedAccesos,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al cargar los datos de pantallas y accesos',
      error: error.message,
    });
  }
}; */




/* exports.viewRoutes = async (req, res) =>{
  const { token } = req.cookies;
  if (!token) return res.json({ message: "No token, authorization denied" });

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401).json({ message: "Token is not valid" });;

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401).json({ message: "user not found" });;

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      cookies: req.cookies
    });
  });
} */