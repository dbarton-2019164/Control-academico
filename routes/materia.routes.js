const { Router } = require("express");
const { check } = require("express-validator");
const {
  existeMaestroById,
  nombreExiste,
  existeMateriaById,
} = require("../helpers/db-validator");

const {
  getMaterias,
  materiasPost,
  materiasPut,
  getMateriaById,
  materiasDelete,
} = require("../controllers/materia.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();

router.get("/", getMaterias);

router.get(
  "/:id",
  [
    check("id", "No es un id de MongoDB").isMongoId(),
    check("id").custom(existeMateriaById),
    validarCampos
  ],
  getMateriaById
);

router.post(
  "/",
  [
    check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
    check("nombre").custom(nombreExiste),
    validarCampos,
  ],
  materiasPost
);

router.put(
  "/:id",
  [
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeMateriaById),
    check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
    check("nombre").custom(nombreExiste),
    validarCampos,
  ],
  materiasPut
);

router.delete(
  "/:id",
  [
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeMateriaById),
    validarCampos,
  ],
  materiasDelete
);

module.exports = router;
