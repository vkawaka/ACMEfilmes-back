/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Filme.
 * Data: 1/2/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 ********************************************************************************************************/



//Import o arquivo DAO que fará a comunicação com o banco de dados.
const classificacaoDAO = require('../model/DAO/classificacao.js')

//Import o arquivo config do projeto.
const message = require('../module/config.js')

const setInserirClassificacao = async() => {
    
}
const getListarClassificacao = async() => {
    
}
const getBuscarClassificacao = async() => {
    
}
const setAtualizarClassificacao = async() => {
    
}
const setDeletarClassificacao = async() => {
    
}

module.exports={
    setInserirClassificacao,
    getListarClassificacao,
    getBuscarClassificacao,
    setAtualizarClassificacao,
    setDeletarClassificacao
}