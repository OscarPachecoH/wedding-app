// La contrasela predeterminada es demo1234 revisa el arvhico bodas.sql

const { pool } = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const inicio = 'SELECT * FROM users WHERE users.username = ? AND users.password = ?';
const busUser = 'SELECT * FROM users WHERE users.username = ?;';
const busUserbyId = 'SELECT * FROM users WHERE users.id = ?;';
const cambioPass = 'UPDATE users SET users.password = ? WHERE users.id = ?;';
const insetUser = 'INSERT INTO users (name, lastname, username, password, role) VALUES (?, ?, ?, ?, ?)';

const inicioSesion = async (req, res) => {
    try {
        const { user, password } = req.body;
        
        const values = [user, password];

        // Comprobamos si el usuario existe
        const [rows] = await pool.query(busUser, [user]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado...'
            });
        }

        // Asignamos los valoores de nuestra base de datos en una varible
        const userDB = rows[0];

        // Usamos el metodo de bycrypt para comparar la contraseña con el texto plano del input
        const isMatch = await bcrypt.compare(password, userDB.password);

        // Validación de comparación
        if(!isMatch){
            return res.status(401).json({
                message: 'Contraseña incorrecta...'
            });
        }

        // Creacón de web token
        const token = jwt.sign(
            {
                id: userDB.id,
                role: userDB.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }    
        );

        return res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: userDB.id,
                name: userDB.name,
                lastName: userDB.lastname,
                username: userDB.username,
                role: userDB.role
            }
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error del servidor...'
        });
    }
};

const registrer = async (req, res) => {
    try {
        const { name, lastName, username, password, role } = req.body;
        const values = [name, lastName, username, password, role];

        // Validación de campos vacios
        if(!name || !lastName || !username || !password){
            return res.status(400).json({
                message: 'Todos los campos son obligatorios...'
            });
        }

        // Validacion para evitar duplicaciónde usuarios
        const [existingUser] = await pool.query(busUser, [username]);

        if(existingUser.length > 0){
            return res.status(404).json({
                message: 'El usuario ya existe'
            });
        }

        // Uso de metodo para hastear contraseña
        const hasedPassword = await bcrypt.hash(password, 10);

        // Ejecución de query para inserción de datos
        await pool.query(insetUser, [ name, lastName, username, hasedPassword, role || 'USER']);

        return res.status(201).json({
            message: 'Usuario registrado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error del servidor'
        });
    }
}

const cambioPassword = async (req, res) => {
    try {
        const { idUser } = req.params;
        const { password, newPassword } = req.body;

        const [resBusqueda] = await pool.query(busUserbyId, idUser);

        if (resBusqueda.length <= 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        const user = resBusqueda[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: 'Contraseña actual incorrecta'
            });
        }

        const hasedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query(cambioPass, [hasedPassword, idUser]);

        return res.json({
            message: 'Contraseña actualizada correctamente'
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

module.exports = {
    inicioSesion,
    registrer,
    cambioPassword
}