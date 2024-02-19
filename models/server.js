const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.materiaPath = "/academic/materias";
    this.usuarioPath = "/academic/usuarios";
    this.studentPath = "/academic/student";
    this.loginPath = "/academic/login";
    this.asignarPath = "/academic/asignar";
    this.teacherPath = "/academic/teacher";
    this.controlPath = "/academic/control";
    this.conectarDB();

    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.materiaPath, require("../routes/materia.routes"));
    this.app.use(this.usuarioPath, require("../routes/user.routes"));
    this.app.use(this.studentPath, require("../routes/student.routes"));
    this.app.use(this.loginPath, require("../routes/login.routes"));
    this.app.use(this.asignarPath, require("../routes/asignar.routes"));
    this.app.use(this.teacherPath, require("../routes/teacher.routes"));
    this.app.use(this.controlPath, require("../routes/crudProfesor"));

    
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Servidor ejecutando y escuchando por el puerto ${this.port}`
      );
    });
  }
}

module.exports = Server;
