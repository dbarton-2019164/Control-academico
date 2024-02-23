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

  materias: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "./materia.model.js",
      },
    ],
    validate: [arrayLimit, "{PATH} exceeds the limit of 3"],
  },
});

function arrayLimit(val) {
  return val.length <= 3;
}

module.exports = model("Usuario", UserSchema);
