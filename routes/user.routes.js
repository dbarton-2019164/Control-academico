const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMaterias,
  materiasPost,
} = require("../controllers/materia.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();

router.get("/", getMaterias);

router.post(
  "/",
  [
    check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
    validarCampos,
  ],
  materiasPost
);

module.exports = router;
