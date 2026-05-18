const { Router } = require('express');
const { inicioSesion, cambioPassword, registrer } = require('../controllers/loginController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

const router = Router();

router.post('/inicio', inicioSesion); // Endpoint de inicio de sesión

router.post('/registrar', verifyToken, verifyAdmin, registrer); // Se necesitan permisos de ADMIN para registrar

/** Para el primer registro usa el siguiente endpoint */
// router.post('/registrar', registrer); 

router.patch('/actualizarContra/:idUser', cambioPassword); // Endpoint para actualizar usuario.

module.exports = router;