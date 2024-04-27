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
const diretorDAO = require('../model/DAO/diretor.js')
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')
const sexoDAO = require('../model/DAO/sexo.js')



//Import o arquivo config do projeto.
const message = require('../module/config.js')

const setInserirDiretor = async(dadosBody, contentType) => {
    try {
        let diretorJSON = {}
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
                    let newDiretor = await diretorDAO.insertDiretor(dadosBody)
                    let lastId = await diretorDAO.selectLastIdDiretor()

                   
                    if(newDiretor){
                        for (let index = 0; index < arrayNacs.length; index++) {
                            const element = arrayNacs[index];
                            await nacionalidadeDAO.insertDiretorNacionalidade(lastId[0].id, element)
                        }

                        let nasci = await nacionalidadeDAO.selectNacionalidadeByDiretor(lastId[0].id)
                        dadosBody.nacionalidade = nasci
                        let sexo = await sexoDAO.selectSexoById(dadosBody.id_sexo)
                        dadosBody.id = lastId[0].id
                        delete dadosBody.id_sexo
                        dadosBody.sexo = sexo

                        diretorJSON.diretor = dadosBody
                        diretorJSON.status = message.SUCCESS_CREATED_ITEM.status
                        diretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        diretorJSON.message = message.SUCCESS_CREATED_ITEM.message

                        return diretorJSON

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
const getListarDiretores = async() => {
    try {
        let diretorJSON = {}

        let dadosDiretor = await diretorDAO.selectAllDiretores()
        if(dadosDiretor){
            for (let index = 0; index < dadosDiretor.length; index++) {
                const element = dadosDiretor[index];
                let nasci = await nacionalidadeDAO.selectNacionalidadeByDiretor(element.id)
                element.nacionalidade = nasci
                let sexo = await sexoDAO.selectSexoById(element.id_sexo)
                delete element.id_sexo
                element.sexo = sexo
            }
            diretorJSON.diretores = dadosDiretor
            diretorJSON.status = message.SUCCESS_CREATED_ITEM.status
            diretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code

                return diretorJSON

        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}
const getBuscarDiretor = async(id) => {
    try {
        let idDiretor = id
        if(idDiretor == undefined || idDiretor == '' || idDiretor == null || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID
        }else{
            let diretorJSON = {}

            let dadosDiretor = await diretorDAO.selectDiretorById(idDiretor)

            if(dadosDiretor){
                console.log(dadosDiretor[0])



                let nasci = await nacionalidadeDAO.selectNacionalidadeByDiretor(idDiretor)
                console.log(nasci);
                dadosDiretor[0].nacionalidade = nasci
                let sexo = await sexoDAO.selectSexoById(dadosDiretor[0].id_sexo)
                console.log(dadosDiretor.id_sexo);
                delete dadosDiretor[0].id_sexo
                dadosDiretor[0].sexo = sexo
                console.log(dadosDiretor)
                diretorJSON.diretor = dadosDiretor
                diretorJSON.status_code = 200

                return diretorJSON
            }else{
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


const setAtualizarDiretor = async(id, dadosBody, contentType) => {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            let idDiretor = id
            let arrayNacs= dadosBody.nacionalidade
            let diretorJSON = {}


            if (idDiretor == '' || idDiretor == undefined || idDiretor == null || isNaN(idDiretor)){
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
                        let verifyId = await diretorDAO.selectDiretorById(idDiretor)

                        if(verifyId){

                            dadosBody.id = idDiretor
                            let att = await diretorDAO.updateDiretor(idDiretor, dadosBody)
                            let getDiretor = await diretorDAO.selectDiretorById(idDiretor)
                            console.log(getDiretor);
                            if (att) {
                                let diretor_ant = await nacionalidadeDAO.selectNacionalidadeByDiretorU(idDiretor)
                                    if (diretor_ant) {

                                        
                                        
                                        await nacionalidadeDAO.deleteNacionalidadeByDiretor(idDiretor)

                                        for (let index = 0; index < arrayNacs.length; index++) {
                                            const nacUpdate = arrayNacs[index];
                                            const nacExist = diretor_ant[index]

                                                
                                            await nacionalidadeDAO.insertDiretorNacionalidade(idDiretor, nacUpdate)
                                            
                                            
                                        }
                                       
                                    }else{
                                        return message.ERROR_INTERNAL_SERVER_DB
                                    }
                                let dadosUpdate = getDiretor[0]
                                let nasci = await nacionalidadeDAO.selectNacionalidadeByDiretor(dadosUpdate.id)
                                dadosUpdate.nacionalidade = nasci
                                let sexo = await sexoDAO.selectSexoById(dadosUpdate.id_sexo)
                                delete dadosUpdate.id_sexo
                                dadosUpdate.sexo = sexo
                                diretorJSON.diretor = dadosUpdate
                                diretorJSON.status = message.SUCCESS_CREATED_ITEM.status
                                diretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                                diretorJSON.message = message.SUCCESS_CREATED_ITEM.message

                                return diretorJSON
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
const setDeletarDiretor = async(id) => {
    try {
        let idDiretor = id
        if(idDiretor == '' || idDiretor == null || idDiretor == undefined || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID
        }else{
            let idVerify = await diretorDAO.selectDiretorById(idDiretor)
            console.log(idVerify);
            if(idVerify.length > 0){
                await nacionalidadeDAO.deleteNacionalidadeByDiretor(idDiretor)
                let deletado = await diretorDAO.deleteDiretor(idDiretor)

     
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
    setInserirDiretor,
    getListarDiretores,
    getBuscarDiretor,
    setAtualizarDiretor,
    setDeletarDiretor
}