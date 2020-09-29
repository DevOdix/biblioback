const express = require('express');

const livresController = require('../controllers/livre-controller');
const router = express.Router();

router.get('/',livresController.getLivres);
router.post('/addLivre',livresController.addLivre);

module.exports = router;

