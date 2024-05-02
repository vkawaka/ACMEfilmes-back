/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Filme.
 * Data: 1/2/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 ********************************************************************************************************/



//Import o arquivo DAO que fará a comunicação com o banco de dados.
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')

//Import o arquivo config do projeto.
const message = require('../module/config.js')

const getListarNacionalidade = async() => {
    let nacionalidadeJSON = {}

    let dados = await nacionalidadeDAO.selectAllNacionalidades()

    if(dados){
        if(dados.length > 0){
            
            nacionalidadeJSON.nacionalidades = dados
            nacionalidadeJSON.quantidade = dados.length
            nacionalidadeJSON.status_code = 200

            return nacionalidadeJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

module.exports={
    getListarNacionalidade
}