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
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELET, OPTIONS')
    
    app.use(cors())

    next()
})

/******************************Import dos arquivos da controller do projeto.*****************************/
 const controllerFilmes = require('./controller/controller_filme.js') 
  
  
 
 /******************************************************************************************************/

const bodyParserJSON = bodyParser.json()


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

    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
   
})

//1.0: retorna um filmes de acordo com o id
    //Período de funcionamento: jan/2024 - fev/2024
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

//EndPoint: Retorna um filme do BD de acordo com uma parte do nome, ou o nome inteiro
    //Período de funcionamento: fev/2024
app.get('/v2/acmefilmes/filmeNome', cors(), async function(request, response, next){
    let nome = request.query.nomeFilme
    let dados = await controllerFilmes.getBuscarFilmeNome(nome)

    response.status(dados.status_code)
    response.json(dados)
        
})

//EndPoint: Retorna um filme do BD de acordo com o ID
    //Período de funcionamento: fev/2024
app.get('/v2/acmefilmes/filmeId/:id', cors(), async function(request, response, next){
    //Recebe o ID da requisição
    let idFilme = request.params.id
    //Encaminha o id para a controller buscar o filme.
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})


//EndPoint: Insere um filme no BD.
    //Período de funcionamento: fev/2024
app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body


    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)


})

app.put('/v2/acmefilmes/filme/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    let idFilme = request.params.id
    let dadosPut = request.body

    let resultUpdateFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosPut, contentType)

    response.status(resultUpdateFilme.status_code)
    response.json(resultUpdateFilme)
})

app.delete('/v2/acmefilmes/filme/:id', cors(), async function(request, response){
    //Recebe o ID da requisição
    let idFilme = request.params.id
    //Encaminha o id para a controller buscar o filme.
    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.listen('8080', function(){
    console.log('roda')
})