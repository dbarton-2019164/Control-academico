const { response, json } = require("express");

const bcrypt = require("bcrypt");

const Materia = require("../models/materia.model");
const { check } = require("express-validator");
const { existeMaestroById } = require("../helpers/db-validator");

const getMaterias = async (req, res = response) => {
  const { query } = { estado: true };

  const [total, materias] = await Promise.all([
    Materia.countDocuments(query),
    Materia.find(query),
  ]);

  res.status(200).json({
    total,
    materias,
  });
};

const getMateriaById = async (req, res) => {
  const { id } = req.params;
  const materia = await Materia.findOne({ _id: id });

  res.status(200).json({
    materia,
  });
};

const materiasPost = async (req, res) => {
  const { nombre } = req.body;
  const materia = new Materia({ nombre });

  await materia.save();
  res.status(200).json({
    materia,
  });
};
// AQUI ESTOY TRABAJANDO

const materiasPut = async (req, res) => {
  const { id } = req.params;
  const { maestroId, ...resto } = req.body;

  try {
    await check(maestroId).custom(existeMaestroById).run(req);

    await Materia.findByIdAndUpdate(id, { maestro: maestroId, ...resto });

    const materiaActualizada = await Materia.findById(id);

    return res.status(200).json({
      msg: "Materia actualizada exitosamente",
      materia: materiaActualizada,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};
/*
const asignarMaestroPut = async (req, res) => {
  const { id } = req.params;
  const { _id, nombre, ...resto } = req.body;
  await Materia.findByIdAndUpdate(id, resto);
  const materia = await Materia.findOne({ _id: id });
  req.status(200).json({
    msg: "Maestro asignado exitosamente",
    materia,
  });
};
*/
const materiasDelete = async (req, res) => {
  const { id } = req.params;
  await Materia.findByIdAndUpdate(id, { estado: false });

  const materia = await Materia.findOne({ _id: id });

  res.status(200).json({
    msg: "Materia eliminada exitosamente",
    materia,
  });
};

module.exports = {
  getMaterias,
  materiasPost,
  materiasPut,
  getMateriaById,
  materiasDelete,
};
