const express = require('express');
const router = express.Router();
const jogosController = require('../controllers/jogosController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/partida', verifyToken, jogosController.registrarPartida);

module.exports = router;
