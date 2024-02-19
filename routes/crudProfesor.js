const { Router } = require("express");
const { check } = require("express-validator");

const {
  nombreExiste,
  existeMateriaById,
  
} = require("../helpers/db-validator");

const {
  materiasPostMaestro,
  getMateriasByProfesor,
  materiasDeleteProfesor,
  materiasPutProfesor

} = require("../controllers/materia.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();



router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
    check("nombre").custom(nombreExiste),
    validarCampos,
  ],
  materiasPostMaestro
);

router.get("/", 
[
  validarJWT,
  validarCampos
],
getMateriasByProfesor);

router.delete(
  "/:id", 
[ validarJWT,
  check("id","Formato no valido").isMongoId(),
  check("id").custom(existeMateriaById),
 
  validarCampos
],
materiasDeleteProfesor);

router.put(
  "/:id", 
[ validarJWT,
  check("id","Formato no valido").isMongoId(),
  check("id").custom(existeMateriaById),
  check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
  check("nombre").custom(nombreExiste),
  validarCampos
],
materiasPutProfesor);






module.exports = router;

