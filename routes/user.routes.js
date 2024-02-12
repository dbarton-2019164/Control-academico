const { Router } = require("express");
const { check } = require("express-validator");
const { existeMaestroById, existeMateriaById } = require("../helpers/db-validator");

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

router.put(
    "/:id",
    [
        check("id", "El id no tiene un formato de MongoDB").isMongoId(),
        check("id").custom(existeMateriaById),
        validarCampos,
    ],
    maet

)


module.exports = router;
