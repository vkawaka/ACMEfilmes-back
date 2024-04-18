/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Filme.
 * Data: 1/2/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 * 
 * 
 * nome VARCHAR(100) NOT NULL,
  data_nascimento DATE NULL,
  biografia TEXT NULL,
  id_sexo INT NOT NULL,
 ********************************************************************************************************/



//Import o arquivo DAO que fará a comunicação com o banco de dados.
const atorDAO = require('../model/DAO/ator.js')
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')
const sexoDAO = require('../model/DAO/sexo.js')



//Import o arquivo config do projeto.
const message = require('../module/config.js')

const setInserirAtor = async(dadosBody, contentType) => {
    try {
        let classificacaoJSON = {}
        let arrayNacs = dadosBody.nacionalidade
        if(String(contentType).toLowerCase() == 'application/json'){

            if(dadosBody.nome == null || dadosBody.nome == undefined || dadosBody.nome == '' || dadosBody.nome.length > 100 ||
            dadosBody.data_nascimento == null || dadosBody.data_nascimento == undefined || dadosBody.data_nascimento == '' || dadosBody.data_nascimento.length != 10
            ){
                return message.ERROR_INVALID_REQUIRED_FIELDS

            }else{
                let validateStatus =  false
                if(dadosBody.biografia != null || dadosBody.biografia != undefined || dadosBody.biografia != ''){
                    if(dadosBody.biografia == null || dadosBody.biografia == undefined || dadosBody.biografia == '' || dadosBody.biografia.length > 655000 ){
                        return message.ERROR_INVALID_REQUIRED_FIELDS
                    }else{
                        validateStatus = true
                    }
                }else{
                    validateStatus = true
                }
                if(validateStatus){
                    let newAtor = await atorDAO.insertAtor(dadosBody)
                    let lastId = await atorDAO.selectLastIdAtor()

                   
                    if(newAtor){
                        for (let index = 0; index < arrayNacs.length; index++) {
                            const element = arrayNacs[index];
                            let nacionalidade = await nacionalidadeDAO.insertAtorNacionalidade(lastId[0].id, element)
                            console.log(nacionalidade);
                        }
                        let nasci = await nacionalidadeDAO.selectNacionalidadeByAtor(lastId[0].id)
                        dadosBody.nacionalidade = nasci
                        let sexo = await sexoDAO.selectSexoById(dadosBody.id_sexo)
                        dadosBody.id = lastId[0].id
                        delete dadosBody.id_sexo
                        dadosBody.sexo = sexo

                        classificacaoJSON.classificacao = dadosBody
                        classificacaoJSON.status = message.SUCCESS_CREATED_ITEM.status
                        classificacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        classificacaoJSON.message = message.SUCCESS_CREATED_ITEM.message

                        return classificacaoJSON

                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB
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
const getListarAtores = async() => {
    try {
        let classificacaoJSON = {}

        let dadosAtor = await atorDAO.selectAllAtores()
        if(dadosAtor){
            for (let index = 0; index < dadosAtor.length; index++) {
                const element = dadosAtor[index];
                let nasci = await nacionalidadeDAO.selectNacionalidadeByAtor(element.id)
                element.nacionalidade = nasci
                let sexo = await sexoDAO.selectSexoById(element.id_sexo)
                delete element.id_sexo
                element.sexo = sexo
            }
                classificacaoJSON.classificacao = dadosAtor
                classificacaoJSON.status = message.SUCCESS_CREATED_ITEM.status
                classificacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code

                return classificacaoJSON

        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}
const getBuscarAtor = async(id) => {
    try {
        let idClassificacao = id
        if(idClassificacao == undefined || idClassificacao == '' || idClassificacao == null || isNaN(idClassificacao)){
            return message.ERROR_INVALID_ID
        }else{
            let classiJSON = {}

            let dadoClassi = await classificacaoDAO.selectClassificacaoById(idClassificacao)
            if(dadoClassi){
                classiJSON.classificacao = dadoClassi
                classiJSON.status = 200

                return classiJSON
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
                        let exists = false
                        dadosBody.id = idClassi
                        
                            classJSON.classificacao = dadosBody
                            classJSON.staus = message.SUCCESS_UPDATED_ITEM.status
                            classJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                            classJSON.message = message.SUCCESS_UPDATED_ITEM.message

                            return classJSON

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
    setInserirAtor,
    getListarAtores,
    getBuscarClassificacao,
    setAtualizarClassificacao,
    setDeletarClassificacao
}