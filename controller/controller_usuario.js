/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Filme.
 * Data: 1/2/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 ********************************************************************************************************/



//Import o arquivo DAO que fará a comunicação com o banco de dados.
const usuarioDAO = require('../model/DAO/usuario.js')

//Import o arquivo config do projeto.
const message = require('../module/config.js')

const getListarUsuario = async() => {
    let usuarioJSON = {}

    let dadosUsuario = await usuarioDAO.selectAllUsuarios()

    if(dadosUsuario){
        if(dadosUsuario.length > 0){
            
            usuarioJSON.usuarios = dadosUsuario
            usuarioJSON.quantidade = dadosUsuario.length
            usuarioJSON.status_code = 200

            return usuarioJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarAdm = async(id) => {
    try {
    let idAdm = id
    let admJSON = {}

    if(idAdm == '' || idAdm == undefined || isNaN(idAdm)){
        return message.ERROR_INVALID_ID //400
    }else{
        let dadosAdm = await admDAO.selectAdmById(idAdm)
        if(dadosAdm){

            if(dadosAdm.length > 0){

                admJSON.filme = dadosAdm
                admJSON.status_code = 200

                return admJSON
            }else{
                return message.ERROR_NOT_FOUND
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirNovoUsuario = async(dados, contentType) => {
    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            let usuarioJSON = {}


            if( dados.usuario == ''                     || dados.usuario == undefined            || dados.usuario == null            || dados.usuario.length > 16       ||
                dados.senha == ''                     || dados.senha == undefined            || dados.senha == null            || dados.senha.length > 32       ||
                dados.email == ''                     || dados.email == undefined            || dados.email == null            || dados.email.length > 255       ||
               dados.nome == '' || dados.nome == undefined  || dados.nome == null || dados.nome.length > 100
            ){
                return message.ERROR_INVALID_REQUIRED_FIELDS //400
            }else{
                let verify = false
                if (dados.foto != null && dados.foto != undefined && dados.foto != '') {
                    if (dados.foto == '') {
                        return message.ERROR_INVALID_REQUIRED_FIELDS
                    } else {
                     verify = true   
                    }
                } else {
                    verify = true
                }
                console.log("ue");
                    if (verify) {
                        let novoUsuario = await usuarioDAO.insertUsuario(dados)
                        console.log(novoUsuario);
                    if(novoUsuario){

                        let idDAO = await usuarioDAO.selectLastId()

                        console.log(idDAO)
                        dados.id = idDAO[0].id

                        usuarioJSON.usuario = dados
                        usuarioJSON.status = message.SUCCESS_CREATED_ITEM.status
                        usuarioJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        usuarioJSON.message = message.SUCCESS_CREATED_ITEM.message
                        
                        return usuarioJSON //201
                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                    }
                }
        }else{
            return message.ERROR_UNSUPORTED_CONTENT_TYPE //415
        }
    }catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarAdm = async(id, dadosAdm, contentType) => {
    try {
        let idAdm = id
        if(String(contentType).toLowerCase() == 'application/json'){
            if(idAdm == '' || idAdm == null || idAdm == undefined || isNaN(idAdm)){
                return message.ERROR_INVALID_ID
            }else{
                let admAtt = {}

                if(dadosAdm.usuario == ''                     || dadosAdm.usuario == undefined            || dadosAdm.usuario == null            || dadosAdm.usuario.length > 45       ||
                dadosAdm.senha == ''                     || dadosAdm.senha == undefined            || dadosAdm.senha == null            || dadosAdm.senha.length > 30       ||
                dadosAdm.email == ''                     || dadosAdm.email == undefined            || dadosAdm.email == null            || dadosAdm.email.length > 45       ||
            //    dadosAdm.chefe == ''                     || dadosAdm.chefe == undefined            || dadosAdm.chefe == null            ||
               dadosAdm.nome == '' || dadosAdm.nome == undefined  || dadosAdm.nome == null || dadosAdm.nome.length > 45
                ){
                    return message.ERROR_INVALID_REQUIRED_FIELDS
                }else{
                    let idVerify = await admDAO.selectAdmById(idAdm)

                    if(idVerify.length > 0){
                        let att = await admDAO.updateAdm(idAdm, dadosAdm)
    
                        if(att){
                            let dado = await admDAO.selectAdmById(idAdm)
                            admAtt.genero = dado
                            admAtt.status = message.SUCCESS_UPDATED_ITEM.status
                            admAtt.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                            admAtt.message = message.SUCCESS_UPDATED_ITEM.message

                            return admAtt
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    }else{
                        return message.ERROR_NOT_FOUND
                    }
                }
            }
        }else{
            return message.ERROR_UNSUPORTED_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirAdm = async(id) => {
    try {
        let idAdm = id
        if(idAdm == '' || idAdm == null || idAdm == undefined || isNaN(idAdm)){
            return message.ERROR_INVALID_ID
        }else{
            let idVerify = await admDAO.selectAdmById(idAdm)

            if(idVerify.length > 0){
                let deletado = await admDAO.deleteAdm(idAdm)
     
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
    getListarUsuario,
    getBuscarAdm,
    setInserirNovoUsuario,
    setAtualizarAdm,
    setExcluirAdm
}