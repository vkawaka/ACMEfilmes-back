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

/******************************Import dos arquivos da controller do projeto.*****************************/
 const controllerFilmes = require('./controller/controller_filme.js') 
  
  
 
 /******************************************************************************************************/


//1.0 : retorna todos os filmes do arquivo filmes.js
    //Período de funcionamento: jan/2024 - fev/2024
app.get('/v1/acmefilmes/filmes', cors(), async function(request, response, next){
    let controleFilmes = require('./controller/funcoes.js')
    let todosFilmes = controleFilmes.getFilmes()

    if(todosFilmes){
        response.json(todosFilmes)
        response.status(200)
    }else{
        response.status(404)
    }
})

//2.0 : retorna todos os filmes do Banco de Dados.
    //Período de funcionamento: fev/2024
app.get('/v2/acmefilmes/filmes', cors(), async function(request, response){
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if(dadosFilmes){
        response.json(dadosFilmes)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404)
    }
})

app.get('/v1/acmefilmes/ListarFilme', cors(), async function(request, response, next){
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

app.get('/v1/acmefilmes/filmeNome', cors(), async function(request, response, next){
    let nome = request.query.nomeFilme
    let dados = await controllerFilmes.getBuscarFilmeNome(nome)
    if(dados){
        response.json(dados)
        response.status(200)
    }else{
        response.status(404)
    }
})

app.listen('8080', function(){
    console.log('roda')
})