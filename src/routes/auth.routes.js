const express = require("express");
const {
  login,
  logout,
  register,
  verifyToken,
  index,
  loadPantallasAndAccesos,
  viewRoutes
} = require("../controllers/auth.controller.js");
const { validateSchema } = require("../middlewares/validator.middleware.js");
const { loginSchema, registerSchema } = require("../schemas/auth.schema.js");

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);

//router.post("/register", register);
//router.post("/login", login);
router.get("/index", index);
//router.get("/cargarpantallas", loadPantallasAndAccesos);


router.get("/registryRoutes", viewRoutes);
router.get("/verify", verifyToken);
router.get("/logout", logout);

module.exports = router;
