const { Router } = require("express");
const { busqueda, casar, generarCRUP } = require("../controllers/casarController");

const router = Router();

//router.get('/buscarPareja/:CURP1/:CURP2', busqueda);
//router.get('/buscarPersona/:CURP1/:CURP2', casar);
//router.get('/buscarPareja/:CURP1/:CURP2', casar)

router.get('/buscarPareja/:CURP1/:CURP2', busqueda);

router.post('/casar/:id1/:id2', casar);

router.get('/curp', generarCRUP);

module.exports = router;