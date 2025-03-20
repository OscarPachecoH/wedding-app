const { pool } = require('../db.js');

const inicio = 'SELECT * FROM admins WHERE admins.user = ? AND admins.password = ?';
const busUser = 'SELECT * FROM admins WHERE admins.idUser = ?;';
const cambioPass = 'UPDATE admins SET admins.password = ? WHERE admins.idUser = ?;';

const inicioSesion = async (req, res) => {
    try {
        const { user, password } = req.body;
        const values = [user, password];
        const [rows] = await pool.query(inicio, values);

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'No hay registro con este correo...'
            });
        }

        return res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}

const cambioPassword = async (req, res) => {
    try {
        const { idUser } = req.params;
        const { password, newPassword } = req.body;

        const [resBusqueda] = await pool.query(busUser, idUser);

        if (resBusqueda.length <= 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        } else {
            const contraOriginal = resBusqueda[0].password;

            if (password.length === 8 && newPassword.length === 8) {
                if (password === contraOriginal && contraOriginal != newPassword) {
                    const row = await pool.query(cambioPass, [newPassword, idUser]);
                    if (row.affectedRows === 0) {
                        return res.status(404).json({
                            message: 'No hubo cambios'
                        });
                    }
                    return res.status(200).json({
                        message: 'Datos actualizados'
                    });
                } else {
                    return res.status(200).json({
                        message: 'Error... La contraseña no es correta o esta repetida'
                    });
                }
            } else {
                return res.status(200).json({
                    message: 'Error... La contraseña no cumple los requisistos'
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}

module.exports = {
    inicioSesion,
    cambioPassword
}