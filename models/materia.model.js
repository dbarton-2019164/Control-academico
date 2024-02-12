const { Schema, model } = require("mongoose");

const MateriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  Maestro: {
    type: Schema.Types.ObjectId,
    ref: "./user.model.js",
    required: false,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Materia", MateriaSchema);
