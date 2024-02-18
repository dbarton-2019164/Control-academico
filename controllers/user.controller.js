const { response, json } = require("express");

const bcrypt = require("bcrypt");

const Usuario = require("../models/user.model");
const { check } = require("express-validator");
const { existeMaestroById } = require("../helpers/db-validator");

const getUser = async (req, res = response) => {
  
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query),
  ]);

  res.status(200).json({
    total,
    usuarios,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findOne({ _id: id });

  res.status(200).json({
    usuario,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });

  await usuario.save();
  res.status(200).json({
    usuario,
  });
};

const usuariosPostSTUDENT = async (req, res) => {
  const { nombre, correo, password } = req.body;
  const usuario = new Usuario({ nombre, correo, password });

  await usuario.save();
  res.status(200).json({
    usuario,
  });
};


const loginUsers = async (req, res) => {
const { correo, password } = req.body;
const usuario = await Usuario.findOne({correo: correo , password: password });
if(!usuario){
  return res.status(400).json({ msg: "Datos incorrectos" });
}
res.status(200).json({
  msg: "Acceso concedido"
})

}

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { maestroId, correo, password, role, ...resto } = req.body;
  await Usuario.findByIdAndUpdate(id, resto);

  const usuario = await Usuario.findOne({ _id: id });

  res.status(200).json({
    msg: "Usuario actualizado exitosamente",
    usuario,
  });
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
const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  await Usuario.findByIdAndUpdate(id, { estado: false });

  const usuario = await Usuario.findOne({ _id: id });

  res.status(200).json({
    msg: "Usuario eliminado exitosamente",
    usuario,
  });
};

module.exports = {
  getUser,
  getUserById,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPostSTUDENT,
  loginUsers
};
