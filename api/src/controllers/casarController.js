const { pool } = require('../db.js');

//const buscar = 'SELECT * FROM personas WHERE personas.CURP = ?;';
const buscar = 'SELECT * FROM personas WHERE personas.CURP IN (?,?);';
const regPareja = 'INSERT INTO parejas(idEsposo, idEsposa) VALUES (?,?);';
const actuEstadoCv = 'UPDATE personas SET personas.estadoCivil = "Casado" WHERE personas.id IN (?, ?);';

const busqueda = async (req, res) => {
    try {
        const { CURP1, CURP2 } = req.params;

        const [busq] = await pool.query(buscar, [CURP1, CURP2]);
        console.log(busq);
        

        return res.json(busq);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}

const casar = async (req, res) => {
    try {
        const { id1, id2 } = req.params;
        const [row] = await pool.query(regPareja, [id1, id2]);

        if (row.affectedRows > 0) {
            const [result] = await pool.query(actuEstadoCv, [id1, id2]);
            
            if(result.affectedRows === 0){
                res.status(409).json({
                    message: "Error DB... No se actualizaron los datos..."
                })
            }

            res.status(200).json({
                message: "Peticion realizada..."
            });

        } else {
            res.status(409).json({
                message: "Error DB... Datos no insertados..."
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}

const generarCRUP = async (req, res) => {
    try {
        // Letras permitidas para la CURP
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const vocales = 'AEIOU';

        // Generar dos letras aleatorias para los apellidos y una para el nombre
        const apellido1 = letras[Math.floor(Math.random() * letras.length)];
        const apellido2 = letras[Math.floor(Math.random() * letras.length)];
        const nombre = letras[Math.floor(Math.random() * letras.length)];
        let nombreS = '';

        const regex = /^[aeiou]$/i;

        if (regex.test(nombre) == false) {
            nombreS = vocales[Math.floor(Math.random() * vocales.length)];
        } else {
            nombreS = letras[Math.floor(Math.random() * letras.length)];
        }

        // Generar año de nacimiento aleatorio entre 1900 y 2022
        const año = Math.floor(Math.random() * (2006 - 1970)) + 1970;

        // Generar mes de nacimiento aleatorio entre 01 y 12
        const mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');

        // Generar día de nacimiento aleatorio entre 01 y 28 (para simplificar)
        const dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

        // Armar la CURP sin el sufijo
        let curp = apellido1 + apellido2 + nombre + nombreS + año.toString().substr(-2) + mes + dia;

        // Generar sufijo aleatorio para completar la longitud de 18 caracteres
        while (curp.length < 18) {
            curp += letras[Math.floor(Math.random() * letras.length)];
        }

        console.log(curp);

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}

module.exports = {
    busqueda,
    casar,
    generarCRUP
}