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

router.put(
  "/",
  [
    validarJWT,
    check("materia1", "El nombre no puede estar vacío").not().isEmpty(),
    check("materia1").custom(materiaNombre),
    check("materia2", "El nombre no puede estar vacío").not().isEmpty(),
    check("materia2").custom(materiaNombre),
    check("materia3", "El nombre no puede estar vacío").not().isEmpty(),
    check("materia3").custom(materiaNombre),
    check().custom(materiasUnicas),
    validarCampos,
  ],
  studentCursoPut
);

router.get("/", [validarJWT, validarCampos], getMateriasUser);


module.exports = router;
