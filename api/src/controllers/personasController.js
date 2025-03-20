const { pool } = require('../db.js');

const mostrar = 'SELECT * FROM personas'
const regPersona = 'INSERT INTO personas(CURP, nombre, apellidoP, apellidoM, edad, sexo, fecha, estadoCivil) VALUES (?,?,?,?,?,?,?,?);';
const borPersona = 'DELETE FROM personas WHERE id = ?;';

const mostPersonas = async (req, res) => {
    const [lista] = await pool.query(mostrar);
    // if(lista.length <= 0){
    //     return res.status(200).json({
    //         message: 'Lista vacia...'
    //     })
    // }
    return res.json(lista);
}

const regisPersonas = async (req, res) => {
    try{
        const { CURP, nombre, apellidoP, apellidoM, edad, sexo, fechaN, estadoCivil } = req.body;
        const values = [CURP, nombre, apellidoP, apellidoM, edad, sexo, fechaN, estadoCivil];
        
        const [rows] = await pool.query(regPersona, values);

        if (rows.insertId != 0) {
            return res.status(200).json({
                message: 'Registro hecho...'
            });
        } else {
            return res.status(200).json({
                message: 'No se realizo el registro...'
            });
        }

    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}

const borrarPersonas = async (req, res) => {
    try{
        const [result] = await pool.query(borPersona,[req.params.id]);
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Registro no encontrado...'
            });
        }
        res.status(200).json({
            message: 'Registro eliminado...'
        });
    }catch(error){
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}

module.exports = {
    mostPersonas,
    regisPersonas,
    borrarPersonas
}