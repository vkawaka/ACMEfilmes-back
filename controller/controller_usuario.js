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

const getBuscarUsuario = async(id) => {
    try {
    let idUsuario = id
    let usuarioJSON = {}

    if(idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)){
        return message.ERROR_INVALID_ID //400
    }else{
        let dadosUsuario = await usuarioDAO.selectUsuarioById(idUsuario)
        if(dadosUsuario){

            if(dadosUsuario.length > 0){

                usuarioJSON.usuario = dadosUsuario
                usuarioJSON.status_code = 200

                return usuarioJSON
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
const getBuscarUsuarioNome = async(nome) => {
    try {
    let usuarioJSON = {}
    console.log(nome);

    if(nome == '' || nome == undefined){
        return message.ERROR_INVALID_ID //400
    }else{
        let dadosUsuario = await usuarioDAO.selectUsuarioByNome(nome)
        if(dadosUsuario){

            if(dadosUsuario.length > 0){

                usuarioJSON.usuario = dadosUsuario
                usuarioJSON.status_code = 200

                return usuarioJSON
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

const setAtualizarUsuario = async(id, dados, contentType) => {
    try {
        let idUsuario = id
        if(String(contentType).toLowerCase() == 'application/json'){
            if(idUsuario == '' || idUsuario == null || idUsuario == undefined || isNaN(idUsuario)){
                return message.ERROR_INVALID_ID
            }else{
                let usuarioAtt = {}

                if(dados.usuario == ''                     || dados.usuario == undefined            || dados.usuario == null            || dados.usuario.length > 16       ||
                dados.senha == ''                     || dados.senha == undefined            || dados.senha == null            || dados.senha.length > 32       ||
                dados.email == ''                     || dados.email == undefined            || dados.email == null            || dados.email.length > 255       ||
               dados.nome == '' || dados.nome == undefined  || dados.nome == null || dados.nome.length > 100
                ){
                    return message.ERROR_INVALID_REQUIRED_FIELDS
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
                    
                    let idVerify = await usuarioDAO.selectUsuarioById(idUsuario)

                    if(idVerify.length > 0){
                        let dado = await usuarioDAO.updateUsuario(idUsuario, dados)
                        console.log(dado);

                        if(dado){

                            let dadosU = await usuarioDAO.selectUsuarioById(idUsuario)


                            usuarioAtt.usuario = dadosU
                            usuarioAtt.status = message.SUCCESS_UPDATED_ITEM.status
                            usuarioAtt.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                            usuarioAtt.message = message.SUCCESS_UPDATED_ITEM.message

                            return usuarioAtt
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

const setExcluirUsuario = async(id) => {
    try {
        let idUsuario = id
        if(idUsuario == '' || idUsuario == null || idUsuario == undefined || isNaN(idUsuario)){
            return message.ERROR_INVALID_ID
        }else{
            let idVerify = await usuarioDAO.selectUsuarioById(idUsuario)

            if(idVerify.length > 0){
                let deletado = await usuarioDAO.deleteUsuario(idUsuario)
     
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
const insertFilmeFav = async(idUsuario, idFilme) => {
    try {
        let idU = idUsuario
        let idF = idFilme
        let usuarioJSON = {}
    
        if(idU == '' || idU == undefined || isNaN(idU) ||
        idF == '' || idF == undefined || isNaN(idF)
    ){
            return message.ERROR_INVALID_ID //400
        }else{
            let insert = await usuarioDAO.insertFav(idU, idF)
            if(insert){

                    usuarioJSON.favoritado = message.SUCCESS_FAVORITE_ITEM.message
                    usuarioJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    return usuarioJSON
    
            }else{
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER
        }
}
const insertFilmeAssistido = async(idUsuario, idFilme) => {
    try {
        let idU = idUsuario
        let idF = idFilme
        let usuarioJSON = {}
    
        if(idU == '' || idU == undefined || isNaN(idU) ||
        idF == '' || idF == undefined || isNaN(idF)
    ){
            return message.ERROR_INVALID_ID //400
        }else{
            let insert = await usuarioDAO.insertAssistido(idU, idF)
            if(insert){
                if(insert.length > 0){
                    usuarioJSON.favoritado = dadosUsuario
                    usuarioJSON.status_code = 200
                    return usuarioJSON
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
const setExcluirFav = async(idUsuario, idFilme) => {
    try {
        let idU = idUsuario
        let idF = idFilme
        if(idU == '' || idU == null || idU == undefined || isNaN(idU) ||
        idF == '' || idF == undefined || isNaN(idF)
    ){
            return message.ERROR_INVALID_ID
        }else{

                let deletado = await usuarioDAO.deleteFilmeFav(idF, idU)
     
                if(deletado){
                    return message.SUCCESS_DELETED_ITEM
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}
const setExcluirAssistido = async(idUsuario, idFilme) => {
    try {
        let idU = idUsuario
        let idF = idFilme
        if(idU == '' || idU == null || idU == undefined || isNaN(idU) ||
        idF == '' || idF == undefined || isNaN(idF)
    ){
            return message.ERROR_INVALID_ID
        }else{

                let deletado = await usuarioDAO.deleteFilmeAssistido(idF, idU)
     
                if(deletado){
                    return message.SUCCESS_DELETED_ITEM
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}
module.exports={
    getListarUsuario,
    getBuscarUsuario,
    setInserirNovoUsuario,
    setAtualizarUsuario,
    setExcluirUsuario,
    insertFilmeFav,
    setExcluirFav,
    insertFilmeAssistido,
    setExcluirAssistido,
    getBuscarUsuarioNome
}