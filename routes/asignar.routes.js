const { Router } = require("express");
const { check } = require("express-validator");
const { materiaNombre, materiasUnicas } = require("../helpers/db-validator");
const {
  studentCursoPut,
  getMateriasUser,
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.put("/", [validarJWT, validarCampos], studentCursoPut);

router.get("/", [validarJWT, validarCampos], getMateriasUser);

module.exports = router;
