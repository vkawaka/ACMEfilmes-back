/**
 * Objetivo: criar uma API para manipular os dados de uma plataforma de streaming/aluguel de filmes.
 * Data: 25/01/2024
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 */

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

app.get('/v1/ACMEFilmes/ListarFilmes', cors(), async function(request, response, next){
    let controleFilmes = require('./controller/funcoes.js')
    let todosFilmes = controleFilmes.getFilmes()

    if(todosFilmes){
        response.json(todosFilmes)
        response.status(200)
    }else{
        response.status(404)
    }
})

app.get('/v1/ACMEFilmes/ListarFilme', cors(), async function(request, response, next){
    let idFilme = request.query.id
    let controleFilmes = require('./controller/funcoes.js')
    let filmeId = controleFilmes.getFilmeId(idFilme)

    if(filmeId){
        response.json(filmeId)
        response.status(200)
    }else{
        response.status(404)
    }
})

app.listen('8080', function(){
    console.log('roda')
})