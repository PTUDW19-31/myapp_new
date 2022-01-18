const express = require('express');
const router = express.Router();
const paymentController = require('./paymentController');

router.post('/:id', paymentController.payment);



module.exports = router;