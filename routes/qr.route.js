const express = require('express');
const router = express.Router()
const {generateQR,getQR} = require('../controllers/qr.controller')

router.post('/generate', generateQR)
router.get('/verify/:id', getQR)
module.exports = router;
