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

 const controllerGeneros = require('./controller/controller_genero.js')

 const controllerClassificacao = require('./controller/controller_classificacao.js')

 const controllerAtor = require('./controller/controller_ator.js')

 const controllerDiretor = require('./controller/controller_diretor.js')

 const controllerAdm = require('./controller/controller_adm.js')

 const controllerUsuario = require('./controller/controller_usuario.js')

 const controllerNacionalidade = require('./controller/controller_nacionalidade.js')
 
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
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){
    let idFilme = request.params.id
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
    let idFilme = request.params.id
    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)
    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

/*********************************************************************************************************************************************/

app.get('/v2/acmefilmes/nacionalidade', cors(), async function(request, response) {
    let dadosGeneros = await controllerNacionalidade.getListarNacionalidade()
    response.status(dadosGeneros.status_code)
    response.json(dadosGeneros)
})

app.get('/v2/acmefilmes/genero', cors(), async function(request, response) {
    let dadosGeneros = await controllerGeneros.getListarGeneros()
    response.status(dadosGeneros.status_code)
    response.json(dadosGeneros)
})
app.get('/v2/acmefilmes/genero/:id', cors(), async function(request, response) {
    let idGenero = request.params.id
    let dadosGenero = await controllerGeneros.getBuscarGenero(idGenero)
    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})
app.post('/v2/acmefilmes/genero', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultDadosNovoGenero = await controllerGeneros.setInserirNovoGenero(dadosBody, contentType)
    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})
app.put('/v2/acmefilmes/genero/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idGenero = request.params.id
    let dadosPUT = request.body

    let resultUpdateGenero = await controllerGeneros.setAtualizarGenero(idGenero, dadosPUT, contentType)
    response.status(resultUpdateGenero.status_code)
    response.json(resultUpdateGenero)
})
app.delete('/v2/acmefilmes/genero/:id', cors(), async function(request, response) {
    let idGenero = request.params.id
    let dadosGenero = await controllerGeneros.setExcluirGenero(idGenero)
    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

/*********************************************************************************************************************************/

app.get('/v2/acmefilmes/classificacao', cors(), async function(request, response){
    let dadosClassi = await controllerClassificacao.getListarClassificacao()
    response.status(200)
    response.json(dadosClassi)

})
app.get('/v2/acmefilmes/classificacao/:id', cors(), async function(request, response){
    let id = request.params.id
    let dados = await controllerClassificacao.getBuscarClassificacao(id)
    console.log(dados);

    response.status(dados.status_code)
    response.json(dados)
})
app.post('/v2/acmefilmes/classificacao', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let newClassificacao = await controllerClassificacao.setInserirClassificacao(dadosBody, contentType)
    response.status(newClassificacao.status_code)
    response.json(newClassificacao)
})
app.put('/v2/acmefilmes/classificacao/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idClassi = request.params.id
    let dadosPUT = request.body

    let resultUpdateClassificacao = await controllerClassificacao.setAtualizarClassificacao(idClassi, dadosPUT, contentType)
    response.status(resultUpdateClassificacao.status_code)
    response.json(resultUpdateClassificacao)
})
app.delete('/v2/acmefilmes/classificacao/:id', cors(), async function(request, response){
    let idClassi = request.params.id
    let dadosCLassi = await controllerClassificacao.setDeletarClassificacao(idClassi)
    response.status(dadosCLassi.status_code)
    response.json(dadosCLassi)
})


/****************************************************************************************************************/
app.get('/v2/acmefilmes/ator', cors(), async function(request, response) {
    let dadosAtor = await controllerAtor.getListarAtores()
    console.log(dadosAtor);
    response.status(200)
    response.json(dadosAtor)
})
app.get('/v2/acmefilmes/ator/:id', cors(), async function(request, response) {
    let idP = request.params.id
    let dados = await controllerAtor.getBuscarAtor(idP)

    response.status(dados.status_code)
    response.json(dados)
})
app.post('/v2/acmefilmes/ator', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let newAtor = await controllerAtor.setInserirAtor(dadosBody, contentType)
    response.status(newAtor.status_code)
    response.json(newAtor)
})
app.put('/v2/acmefilmes/ator/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idAtor = request.params.id
    let dadosPUT = request.body

    let resultUpdateAtor = await controllerAtor.setAtualizarAtor(idAtor, dadosPUT, contentType)

    response.status(resultUpdateAtor.status_code)
    response.json(resultUpdateAtor)
})
app.delete('/v2/acmefilmes/ator/:id', cors(), async function(request, response) {
    let idAtor = request.params.id
    let dadosAtor = await controllerAtor.setDeletarAtor(idAtor)
    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

/**************************************************************************************************************************************** */

app.get('/v2/acmefilmes/diretor', cors(), async function(request, response) {
    let dadosDiretor = await controllerDiretor.getListarDiretores()
    console.log(dadosDiretor);
    response.status(200)
    response.json(dadosDiretor)  
})
app.get('/v2/acmefilmes/diretor/:id', cors(), async function(request, response) {
    let idP = request.params.id
    let dados = await controllerDiretor.getBuscarDiretor(idP)

    response.status(dados.status_code)
    response.json(dados)
})
app.post('/v2/acmefilmes/diretor', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let newDiretor = await controllerDiretor.setInserirDiretor(dadosBody, contentType)
    response.status(newDiretor.status_code)
    response.json(newDiretor)
})
app.put('/v2/acmefilmes/diretor/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idDiretor = request.params.id
    let dadosPUT = request.body

    let resultUpdateAtor = await controllerDiretor.setAtualizarDiretor(idDiretor, dadosPUT, contentType)
    response.status(resultUpdateAtor.status_code)
    response.json(resultUpdateAtor)
})
app.delete('/v2/acmefilmes/diretor/:id', cors(), async function(request, response) {
    let idAtor = request.params.id
    let dadosAtor = await controllerDiretor.setDeletarDiretor(idAtor)
    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

/*******************************************************************************************************************************************************************************************/

app.get('/v2/acmefilmes/adm', cors(), async function(request, response) {
    let dadosAdm = await controllerAdm.getListarAdm()
    response.status(dadosAdm.status_code)
    response.json(dadosAdm)  
})
app.get('/v2/acmefilmes/adm/:id', cors(), async function(request, response) {
    let id = request.params.id
    let dado = await controllerAdm.getBuscarAdm(id)
    response.status(dado.status_code)
    response.json(dado)
})
app.post('/v2/acmefilmes/adm', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let newAdm = await controllerAdm.setInserirNovoAdm(dadosBody, contentType)
    response.status(newAdm.status_code)
    response.json(newAdm)     
})
app.put('/v2/acmefilmes/adm/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idAdm = request.params.id
    let dadosPUT = request.body

    let resultUpdateAdm = await controllerAdm.setAtualizarAdm(idAdm, dadosPUT, contentType)
    response.status(resultUpdateAdm.status_code)
    response.json(resultUpdateAdm)
})
app.delete('/v2/acmefilmes/adm/:id', cors(), async function(request, response) {
    let id = request.params.id
    let dados = await controllerAdm.setExcluirAdm(id)
    response.status(dados.status_code)
    response.json(dados)  
})


/*************************************************************************************************************************** */



app.get('/v2/acmefilmes/usuario', cors(), async function(request, response) {
    let dadosUsuario = await controllerUsuario.getListarUsuario()
    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)  
})
app.get('/v2/acmefilmes/usuario/:id', cors(), async function(request, response) {
    let id = request.params.id
    let dado = await controllerUsuario.getBuscarUsuario(id)
    response.status(dado.status_code)
    response.json(dado)  
})
app.get('/v2/acmefilmes/usuarioNome', cors(), async function(request, response) {
    let nome = request.query.nome
    let dado = await controllerUsuario.getBuscarUsuarioNome(nome)
    response.status(dado.status_code)
    response.json(dado)  
})

app.post('/v2/acmefilmes/usuario', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let newUsuario = await controllerUsuario.setInserirNovoUsuario(dadosBody, contentType)
    response.status(newUsuario.status_code)
    response.json(newUsuario)   
})
app.put('/v2/acmefilmes/usuario/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosPUT = request.body

    let resultUpdate = await controllerUsuario.setAtualizarUsuario(id, dadosPUT, contentType)
    response.status(resultUpdate.status_code)
    response.json(resultUpdate)
})
app.delete('/v2/acmefilmes/usuario/:id', cors(), async function(request, response) {
    let id = request.params.id
    let dados = await controllerUsuario.setExcluirUsuario(id)
    response.status(dados.status_code)
    response.json(dados)  
})

app.post('/v2/acmefilmes/usuario/fav/:idU/:idF', cors(), async function(request, response) {
    let idUsuario = request.params.idU
    let idFilme = request.params.idF    

    let resultUpdate = await controllerUsuario.insertFilmeFav(idUsuario, idFilme)
    response.status(resultUpdate.status_code)
    response.json(resultUpdate)
})
app.post('/v2/acmefilmes/usuario/assitido/:idU/:idF', cors(), async function(request, response) {
    let idUsuario = request.params.idU
    let idFilme = request.params.idF    

    let resultUpdate = await controllerUsuario.insertFilmeAssistido(idUsuario, idFilme)
    response.status(resultUpdate.status_code)
    response.json(resultUpdate)
})
app.delete('/v2/acmefilmes/usuario/fav/:idU/:idF', cors(), async function(request, response) {
    let idUsuario = request.params.idU
    let idFilme = request.params.idF 

    let dados = await controllerUsuario.setExcluirFav(idUsuario, idFilme)
    response.status(dados.status_code)
    response.json(dados)  
})
app.delete('/v2/acmefilmes/usuario/assistido/:idU/:idF', cors(), async function(request, response) {
    let idUsuario = request.params.idU
    let idFilme = request.params.idF 

    let dados = await controllerUsuario.setExcluirAssistido(idUsuario, idFilme)
    response.status(dados.status_code)
    response.json(dados)  
})

// app.get('/v2/acmefilmes/ator', cors(), async function(request, response) {
    
// })
// app.get('/v2/acmefilmes/ator/:id', cors(), async function(request, response) {
    
// })
// app.post('/v2/acmefilmes/ator', cors(), bodyParserJSON, async function(request, response) {
    
// })
// app.put('/v2/acmefilmes/ator', cors(), bodyParserJSON, async function(request, response) {
    
// })
// app.delete('/v2/acmefilmes/ator/:id', cors(), async function(request, response) {
    
// })

app.listen('8080', function(){
    console.log('roda')
})