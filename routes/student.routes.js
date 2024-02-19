const { Router } = require("express");
const { check } = require("express-validator");
const { correoExiste, existeUsuarioById } = require("../helpers/db-validator");

const {
  usuariosPostSTUDENT,
  loginUsers,
  studentDelete,
  studentPut,
  studentCursoPut
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
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





router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeUsuarioById),
    check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
    validarCampos,
  ],
  studentPut
);




router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  studentDelete
);

module.exports = router;

