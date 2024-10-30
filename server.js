const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Conecta ao banco de dados
mongoose.connect('mongodb://localhost/controle-de-gastos');

// Define o modelo de usuário
const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Define as rotas
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  const usuario = new Usuario({ nome, email, senha });

  usuario.save((err) => {
    if (err) {
      res.status(400).send({ message: 'Erro ao cadastrar usuário' });
    } else {
      res.send({ message: 'Usuário cadastrado com sucesso' });
    }
  });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  Usuario.findOne({ email }, (err, usuario) => {
    if (err) {
      res.status(400).send({ message: 'Erro ao logar usuário' });
    } else if (!usuario) {
      res.status(401).send({ message: 'Usuário não encontrado' });
    } else if (usuario.senha !== senha) {
      res.status(401).send({ message: 'Senha incorreta' });
    } else {
      res.send({ message: 'Usuário logado com sucesso' });
    }
  });
});

// Inicia o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get('/usuarios', (req, res) => {
  Usuario.find({}, (err, usuarios) => {
    if (err) {
      res.status(400).send({ message: 'Erro ao listar usuários' });
    } else {
      res.send(usuarios);
    }
  });
});

app.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;

  Usuario.findByIdAndRemove(id, (err, usuario) => {
    if (err) {
      res.status(400).send({ message: 'Erro ao deletar usuário' });
    } else {
      res.send({ message: 'Usuário deletado com sucesso' });
    }
  });
});

app.put('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const { nome, email, senha } = req.body;

  Usuario.findByIdAndUpdate(id, { nome, email, senha }, (err, usuario) => {
    if (err) {
      res.status(400).send({ message: 'Erro ao atualizar usuário' });
    } else {
      res.send({ message: 'Usuário atualizado com sucesso' });
    }
  });
});