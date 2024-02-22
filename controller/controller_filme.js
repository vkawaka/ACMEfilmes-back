/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Filme.
 * Data: 1/2/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 ********************************************************************************************************/

//Import o arquivo DAO que fará a comunicação com o banco de dados.
const filmeDAO = require('../model/DAO/filme.js')

//Função para validar e inserir um novo filme.
const setInserirNovoFilme = async() => {

}

//Função para validar e atualizar um filme.
const setAtualizarFilme = async() => {

}

//função para excluir um filme.
const setExcluirFilme = async() => {

}

//função para retornar todos os filmes.
const getListarFilmes = async() => {
    let filmesJSON = {}

    //Chama a função do DAo para retornar os dados da tabela de filmes
    let dadosFilmes = await filmeDAO.selectAllFilmes()

    //Validação para verificar se existem dados
    if(dadosFilmes){

        //Cria o JSON para devolver para o app
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200

        return filmesJSON
    }else{
        return false
    }
}

//função para retornar todos os filmes.
const getBuscarFilmeNome = async(filmeNome) => {
    let filmesJSON = {}

    //Chama a função do DAo para retornar os dados da tabela de filmes
    let dadosFilmes = await filmeDAO.selectByNameFilme(filmeNome)

    //Validação para verificar se existem dados
    if(dadosFilmes){

        //Cria o JSON para devolver para o app
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200

        return filmesJSON
    }else{
        return false
    }
}

//função para buscar um filmes pelo Id.
const getBuscarFilme = async() => {

}

module.exports={
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getBuscarFilmeNome
}