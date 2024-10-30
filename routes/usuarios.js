const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find().exec();
  res.render('usuarios', { usuarios });
});

module.exports = router;