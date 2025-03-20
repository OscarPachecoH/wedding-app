const { Router } = require('express');
const { inicioSesion, cambioPassword } = require('../controllers/loginController');

const router = Router();

router.post('/inicio', inicioSesion);

router.patch('/actualizarContra/:idUser', cambioPassword);

module.exports = router;