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

const setInserirClassificacao = async(dadosBody, contentType) => {
    try {
        let classificacaoJSON = {}
        if(String(contentType).toLowerCase() == 'application/json'){

            if(dadosBody.faixa_etaria == null || dadosBody.faixa_etaria == undefined || dadosBody.faixa_etaria == '' || isNaN(dadosBody.faixa_etaria) || dadosBody.faixa_etaria.length > 2 ||
            dadosBody.classificacao == null || dadosBody.classificacao == undefined || dadosBody.classificacao == '' || dadosBody.classificacao.length > 45  ||
            dadosBody.caracteristica == null || dadosBody.caracteristica == undefined || dadosBody.caracteristica == '' || dadosBody.caracteristica.length > 200 ||
            dadosBody.icone == null || dadosBody.icone == undefined || dadosBody.icone == '' || dadosBody.icone.length > 65000
            ){
                console.log(dadosBody)
                return message.ERROR_INVALID_REQUIRED_FIELDS

            }else{
                let newClassificacao = await classificacaoDAO.insertClassificacao(dadosBody)
                let lastId = await classificacaoDAO.selectLastId()

                if(newClassificacao){
                    dadosBody.id = lastId[0].id

                    classificacaoJSON.classificacao = dadosBody
                    classificacaoJSON.status = message.SUCCESS_CREATED_ITEM.status
                    classificacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    classificacaoJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return classificacaoJSON

                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
               }

        }else{
            return message.ERROR_UNSUPORTED_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}
const getListarClassificacao = async() => {
    try {
        let classificacaoJSON = {}

        let dadosClassificacao = await classificacaoDAO.selectAllClassificacao()
        if(dadosClassificacao){
            classificacaoJSON.classificacao = dadosClassificacao
            classificacaoJSON.status = 200

            return classificacaoJSON
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}
const getBuscarClassificacao = async(id) => {
    try {
        let idClassificacao = id
        if(idClassificacao == undefined || idClassificacao == '' || idClassificacao == null || isNaN(idClassificacao)){
            return message.ERROR_INVALID_ID
        }else{
            let classiJSON = {}

            let dadoClassi = await classificacaoDAO.selectClassificacaoById(idClassificacao)
            console.log(dadoClassi)
            if(dadoClassi){
                if (dadoClassi.length > 0) {
                classiJSON.classificacao = dadoClassi
                classiJSON.status_code = 200

                return classiJSON
                } else {
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}
const setAtualizarClassificacao = async(id, dadosBody, contentType) => {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            let idClassi = id
            let classJSON = {}
            if (idClassi == '' || idClassi == undefined || idClassi == null || isNaN(idClassi)){
                return message.ERROR_INVALID_ID
            }else{
                if (dadosBody.faixa_etaria == null || dadosBody.faixa_etaria == undefined || dadosBody.faixa_etaria == '' || isNaN(dadosBody.faixa_etaria) || dadosBody.faixa_etaria.length > 3 ||
                dadosBody.classificacao == null || dadosBody.classificacao == undefined || dadosBody.classificacao == '' || dadosBody.classificacao.length > 45 ||
                dadosBody.caracteristica == null || dadosBody.caracteristica == undefined || dadosBody.caracteristica == '' || dadosBody.caracteristica.length > 200 ||
                dadosBody.icone == null || dadosBody.icone == undefined || dadosBody.icone == '' || dadosBody.icone.length > 65000) {
                    return message.ERROR_INVALID_REQUIRED_FIELDS
                } else {
                    let verifyId = await classificacaoDAO.selectClassificacaoById(idClassi)

                    if(verifyId){
                        dadosBody.id = idClassi
                        let attClassi = await classificacaoDAO.updateClassificacao(dadosBody)
                        if (attClassi) {
                            classJSON.classificacao = dadosBody
                            classJSON.staus = message.SUCCESS_UPDATED_ITEM.status
                            classJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                            classJSON.message = message.SUCCESS_UPDATED_ITEM.message

                            return classJSON

                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    }else{
                        return message.ERROR_NOT_FOUND
                    }
                }
            }
        }else{
            return message.ERROR_UNSUPORTED_CONTENT_TYPE
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}
const setDeletarClassificacao = async(id) => {
    try {
        let idClassi = id
        if(idClassi == '' || idClassi == null || idClassi == undefined || isNaN(idClassi)){
            return message.ERROR_INVALID_ID
        }else{
            let idVerify = await classificacaoDAO.selectClassificacaoById(idClassi)

            if(idVerify.length > 0){
                let deletado = await classificacaoDAO.deleteClassificacao(idClassi)
     
                if(deletado){
                    return message.SUCCESS_DELETED_ITEM
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports={
    setInserirClassificacao,
    getListarClassificacao,
    getBuscarClassificacao,
    setAtualizarClassificacao,
    setDeletarClassificacao
}