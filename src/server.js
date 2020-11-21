const express = require("express");
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors= require('cors')


//VARIAVEIS DE AMBIENTE
require('dotenv').config({
    path: '.env'
});


//Public 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//BANCO DE DADOS
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
});

app.use(cors())
//ROTAS
const routers = require('./routers/routers');

app.use('/api', routers);

//TRATAMENTO DE ERRO
app.use((err, req, res, next) => {
    return res.status(500).json({
        status: "error",
        message: err.message,
        data: err
    })
})

let port = process.env.PORT
app.listen(port, () => {
    console.log("Sevidor rodando na porta: " + port)
})