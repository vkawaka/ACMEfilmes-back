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
        let atorJSON = {}
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

                        atorJSON.ator = dadosBody
                        atorJSON.status = message.SUCCESS_CREATED_ITEM.status
                        atorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        atorJSON.message = message.SUCCESS_CREATED_ITEM.message

                        return atorJSON

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
        let atorJSON = {}

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
            atorJSON.ator = dadosAtor
            atorJSON.status = message.SUCCESS_CREATED_ITEM.status
            atorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code

                return atorJSON

        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}
const getBuscarAtor = async(id) => {
    try {
        let idAtor = id
        if(idAtor == undefined || idAtor == '' || idAtor == null || isNaN(idAtor)){
            return message.ERROR_INVALID_ID
        }else{
            let atorJSON = {}

            let dadosAtor = await atorDAO.selectAtorById(idAtor)
            if(dadosAtor){
                console.log(dadosAtor)

                let nasci = await nacionalidadeDAO.selectNacionalidadeByAtor(idAtor)
                dadosAtor[0].nacionalidade = nasci
                let sexo = await sexoDAO.selectSexoById(dadosAtor[0].id_sexo)
                console.log(dadosAtor.id_sexo);
                delete dadosAtor[0].id_sexo
                dadosAtor[0].sexo = sexo
                console.log(dadosAtor)
                atorJSON.ator = dadosAtor
                atorJSON.status = 200

                return atorJSON
            }else{
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


const setAtualizarAtor = async(id, dadosBody, contentType) => {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            let idAtor = id
            let arrayNacs= dadosBody.nacionalidade
            let atorJSON = {}

            if (idAtor == '' || idAtor == undefined || idAtor == null || isNaN(idAtor)){
                return message.ERROR_INVALID_ID
            }else{
                if (dadosBody.nome == null || dadosBody.nome == undefined || dadosBody.nome == '' || dadosBody.nome.length > 100 ||
                dadosBody.data_nascimento == null || dadosBody.data_nascimento == undefined || dadosBody.data_nascimento == '' || dadosBody.data_nascimento.length != 10 ||
                // dadosBody.nacionalidade ==  null || dadosBody.nacionalidade == undefined || dadosBody.nacionalidade != Object ||
                dadosBody.id_sexo == '' || dadosBody.id_sexo == undefined || dadosBody.id_sexo == null || isNaN(dadosBody.id_sexo)) {
                    return message.ERROR_INVALID_REQUIRED_FIELDS
                } else {
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
                    if (validateStatus) {
                        let verifyId = await atorDAO.selectAtorById(idAtor)
                        if(verifyId){
                            dadosBody.id = idAtor
                            let att = await atorDAO.updateAtor(idAtor, dadosBody)
                            let getAtor = await atorDAO.selectAtorById(idAtor)
                            if (att) {
                                await nacionalidadeDAO.deleteNacionalidadeByAtor(idAtor)

                                for (let index = 0; index < arrayNacs.length; index++) {
                                    const nacUpdate = arrayNacs[index];

                                                
                                    await nacionalidadeDAO.insertAtorNacionalidade(idAtor, nacUpdate)
                                }
                                let dadosUpdate = getAtor[0]
                                let nasci = await nacionalidadeDAO.selectNacionalidadeByAtor(getAtor[0].id)
                                dadosUpdate.nacionalidade = nasci
                                let sexo = await sexoDAO.selectSexoById(getAtor[0].id_sexo)
                                delete dadosUpdate.id_sexo
                                dadosUpdate.sexo = sexo
                                atorJSON.ator = dadosUpdate
                                atorJSON.status = message.SUCCESS_CREATED_ITEM.status
                                atorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                                atorJSON.message = message.SUCCESS_CREATED_ITEM.message

                                return atorJSON
                                } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }

                        }else{
                            return message.ERROR_NOT_FOUND
                        }
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
const setDeletarAtor = async(id) => {
    try {
        let idAtor = id
        if(idAtor == '' || idAtor == null || idAtor == undefined || isNaN(idAtor)){
            return message.ERROR_INVALID_ID
        }else{
            let idVerify = await atorDAO.selectAtorById(idAtor)
            console.log(idVerify);
            if(idVerify.length > 0){
                await nacionalidadeDAO.deleteNacionalidadeByAtor(idAtor)
                let deletado = await atorDAO.deleteAtor(idAtor)

     
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
    getBuscarAtor,
    setAtualizarAtor,
    setDeletarAtor
}