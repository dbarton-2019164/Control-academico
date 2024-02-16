const Materia = require("../models/materia.model");
const Usuario = require("../models/user.model");
const existeMaestroById = async (id = "") => {
  const existeUsuario = await Usuario.findOne({ id });
  if (!existeUsuario) {
    throw new Error(`El maestro con el id ${id} no existe`);
  } else if (existeUsuario.role !== "TEACHER_ROLE") {
    throw new Error(`El usuario ${existeUsuario.nombre} no es un maestro`);
  }
};

const existeMateriaById = async (id = "") => {
  const existeMateria = await Materia.findOne({ id });
  if (existeMateria) {
    throw new Error(`La materia con el id ${id} no existe`);
  }
};

module.exports = {
  existeMaestroById,
  existeMateriaById,
};
