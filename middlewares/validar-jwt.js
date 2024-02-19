const jwt = require('jsonwebtoken');
const Usuario = require('../models/user.model')
const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token'
        })
    }
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const usuario = await Usuario.findOne({ _id: uid });
        if(!usuario){
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: "Token valido, usuario no activo"
            })
        }
        req.usuario = usuario;
        next();
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT 
}