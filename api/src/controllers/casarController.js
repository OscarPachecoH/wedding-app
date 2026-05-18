const { pool } = require('../db.js');

const buscarPersonas = 'SELECT * FROM personas WHERE CURP IN (?, ?);';
const buscarMatrimonio = 'SELECT id FROM matrimonios WHERE (persona_1_id = ? AND persona_2_id = ?) OR (persona_1_id = ? AND persona_2_id = ?);';
const insertarMatrimonio = 'INSERT INTO matrimonios (persona_1_id, persona_2_id, fecha_matrimonio, created_by) values (?, ?, CURDATE(), ?);';
const actualizarEstadoCivil = 'UPDATE personas SET estadoCivil = "Casado" WHERE id IN (?, ?);';

const busqueda = async (req, res) => {
    try {
        const { CURP1, CURP2 } = req.params;

        const [busq] = await pool.query(buscarPersonas, [CURP1, CURP2]);
        console.log(busq);
        
        return res.json(busq);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}

const casar = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const { id1, id2 } = req.params;
        const created_by = req.user.id;

        if(id1 === id2){
            return res.status(400).json({
                message: 'Una persona no se puede casar consigo misma'
            });
        }

        await connection.beginTransaction();

        const [personas] = await connection.query(
            'SELECT * FROM personas WHERE id IN (?, ?);', [id1, id2]
        );

        if(personas.length !== 2){
            await connection.rollback();
            return res.status(405).json({
                message: 'No se encontraron ambas personas'
            });
        }

        const [persona1, persona2] = personas;

        if(persona1.edad < 18 || persona2.edad < 18){
            await connection.rollback();
            return res.status(400).json({
                message: 'Ambas personas deben de ser mayores de edad'
            });
        }

        // Validad estado civil
        if(persona1.estadoCivil === 'Casado' || persona2.estadoCivil === 'Casado'){
            await connection.rollback();
            return res.status(409).json({
                message: 'Una de las personas ya está casada'
            });
        }

        // Validad duplicado
        const [matrimonioExiste] = await connection.query('SELECT iD FROM matrimonios WHERE (persona_1_id = ? AND persona_2_id = ?) OR (persona_1_id = ? AND persona_2_id = ?);', [id1, id2, id2, id1]);

        if(matrimonioExiste.length > 0){
            await connection.rollback();
            return req.status(409).json({
                message: 'Este matrimonio y existe'
            });
        }

        // Insertar matrimonio
        await connection.query(insertarMatrimonio, [id1, id2, created_by]);
        await connection.query('UPDATE personas SET estadoCivil = "Casado" WHERE id IN (?, ?)', [id1, id2]);
        await connection.commit();

        return res.status(201).json({
            message: 'Matrimonio registrado correctamente'
        });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    } finally {
        connection.release();
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