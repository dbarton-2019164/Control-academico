const { Router } = require("express");
const { check } = require("express-validator");
const { correoExiste, existeUsuarioById } = require("../helpers/db-validator");

const {
  usuariosPostSTUDENT,
  loginUsers
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();

router.post(
"/",
  [
    check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
    check("correo", "No es un correo válido").isEmail(),
    check("correo").custom(correoExiste),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  usuariosPostSTUDENT
);

router.get(
  "/",
  [
    check("correo", "No es un correo válido").isEmail(),
    check("correo").custom(correoExiste),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
  ],
  loginUsers

)


module.exports = router;

