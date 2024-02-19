const Materia = require("../models/materia.model");
const Usuario = require("../models/user.model");


const existeMaestroById = async (id = "") => {
  const existeUsuario = await Usuario.findOne({ _id: id });
  if (!existeUsuario) {
    throw new Error(`El maestro con el id ${id} no existe`);
  } else if (existeUsuario.role !== "TEACHER_ROLE") {
    throw new Error(`El usuario ${existeUsuario.nombre} no es un maestro`);
  }
};

const existeMateriaById = async (id = "") => {
  
    const existeMateria = await Materia.findOne({ _id: id });
    if (!existeMateria) {
      throw new Error(`La materia con el id ${id} no existe`);
    }
  }


  async function nombreExiste(nombre = "") {
    const materia = await Materia.findOne({ nombre: nombre });
    if(materia){
      throw new Error(`La materia ya existe`);
    }
  }

  async function materiaNombre(nombre = "") {
    const materia = await Materia.findOne({ nombre: nombre });
    if(!materia){
      throw new Error(`La materia no existe`);
    }
  }


const existeUsuarioById = async (id = "") => {
  
    const existeUsuario = await Usuario.findOne({ _id: id });
    if (!existeUsuario) {
      throw new Error(`El usuario con el id ${id} no existe`);
    }
  }


async function correoExiste(correo = "") {
  const usuario = await Usuario.findOne({ correo: correo });
  if(usuario){
    throw new Error(`El usuario ya existe`);
  }
}

const materiasUnicas = (value, { req }) => {
  const materias = [req.body.materia1, req.body.materia2, req.body.materia3];
  const uniqueMaterias = new Set(materias);
  if (uniqueMaterias.size !== materias.length) {
    throw new Error('Las tres materias deben ser diferentes entre sí');
  }
  return true;
};

module.exports = {
  existeMaestroById,
  existeMateriaById,
  correoExiste,
  existeUsuarioById,
  nombreExiste,
  materiaNombre,
  materiasUnicas
};
