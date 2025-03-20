const { Router } = require("express");
const { mostPersonas, regisPersonas, borrarPersonas } = require("../controllers/personasController");

const router = Router();

router.get('/personas', mostPersonas);

router.post('/personas/registrar', regisPersonas);

router.delete('/personas/borrar/:id', borrarPersonas);

module.exports = router;