const { Router } = require("express");
const { check } = require("express-validator");
const { correoExiste, existeUsuarioById } = require("../helpers/db-validator");

const {
  getUser,
  getUserById,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();

router.get("/", getUser);

router.get(
  "/:id",
  [check("id", "No es un id de MongoDB").isMongoId(),
  check("id").custom(existeUsuarioById),
  validarCampos,
],
  getUserById
);

router.post(
  "/",
  [
    check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
    check("correo", "No es un correo valido").isEmail(),
    check("correo").custom(correoExiste),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeUsuarioById),
    check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
