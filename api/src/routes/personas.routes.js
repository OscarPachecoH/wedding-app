const { Router } = require("express");
const { mostPersonas, regisPersonas, borrarPersonas } = require("../controllers/personasController");
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

const router = Router();

router.get('/personas', mostPersonas);

router.post('/personas/registrar', verifyToken, verifyAdmin, regisPersonas);

router.delete('/personas/borrar/:id', borrarPersonas);

module.exports = router;