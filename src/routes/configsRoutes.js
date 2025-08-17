const express = require('express');
const controller = require('../controllers/configsController');
const router = express.Router();

router.get('/', controller.getAll.bind(controller));
router.get('/:key', controller.getOne.bind(controller));

module.exports = router;
