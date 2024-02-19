const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,

  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  role: {
    type: String,
    required: true,
    enum: ["TEACHER_ROLE", "STUDENT_ROLE"],
    default: "STUDENT_ROLE",
  },
  estado: {
    type: Boolean,
    default: true,
  },
  // Asignar ALUMNOS
  materia1: {
    type: String,
  },

  materia2: {
    type: String,
  },

  materia3: {
    type: String,
  },
});

module.exports = model("Usuario", UserSchema);
