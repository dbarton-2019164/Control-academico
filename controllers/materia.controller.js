const { response, json } = require("express");

const bcrypt = require("bcrypt");

const Materia = require("../models/materia.model");

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

const materiasPost = async (req, res) => {
  const { nombre } = req.body;
  const materia = new Materia({ nombre });

  await materia.save();
  res.status(200).json({
    materia,
  });
};

module.exports = {
  getMaterias,
  materiasPost,
};
