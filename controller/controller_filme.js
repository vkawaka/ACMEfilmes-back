/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Filme.
 * Data: 1/2/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 ********************************************************************************************************/



//Import o arquivo DAO que fará a comunicação com o banco de dados.
const filmeDAO = require('../model/DAO/filme.js')

//Import o arquivo config do projeto.
const message = require('../module/config.js')

//Função para validar e inserir um novo filme.
const setInserirNovoFilme = async(dadosFilme) => {

    let novoFilmeJSON = {}

    if(dadosFilme.nome == ''                     || dadosFilme.nome == undefined            || dadosFilme.nome == null            || dadosFilme.nome.length > 80       ||
       dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined         || dadosFilme.sinopse == null         || dadosFilme.sinopse.length > 65000 ||
       dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined         || dadosFilme.duracao == null         || dadosFilme.duracao.length > 8     ||
       dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10   ||
       dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa == null       || dadosFilme.foto_capa.length > 200 ||
       dadosFilme.valor_unitario.length > 6
    ){
        return message.ERROR_INVALID_REQUIRED_FIELDS //400
    }else{

        let validateStatus = false

        //Validação da data de relançamentos, já que ela não é obrigatória no Banco de Dados
        if(dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != undefined){

            //Validação para verificar se a data está com a quantidade de dígitos correta
            if(dadosFilme.data_relancamento.length != 10){
                return message.ERROR_INVALID_REQUIRED_FIELDS //400
            }else{
                validateStatus = true
            }
        }else{
            validateStatus = true
        }

        //Validação para verificar se podemos encaminhar os dados para o DAO.
        if(validateStatus){
            let novoFilme = await filmeDAO.insertFilme(dadosFilme)

            //Validação para verificar se o DAO inseriu os dados no BD.
            if(novoFilme){

                let idDAO = await filmeDAO.selectLastIdFilme()

                console.log(idDAO)
                dadosFilme.id = idDAO[0].id

                novoFilmeJSON.filme = dadosFilme
                novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status
                novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message

                return novoFilmeJSON //201
            }else{
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    }

}


//Função para validar e atualizar um filme.
const setAtualizarFilme = async(dadosFilme) => {
    let novoFilmeJSON = {}

    if(dadosFilme.nome == ''                     || dadosFilme.nome == undefined            || dadosFilme.nome == null            || dadosFilme.nome.length > 80       ||
       dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined         || dadosFilme.sinopse == null         || dadosFilme.sinopse.length > 65000 ||
       dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined         || dadosFilme.duracao == null         || dadosFilme.duracao.length > 8     ||
       dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10   ||
       dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa == null       || dadosFilme.foto_capa.length > 200 ||
       dadosFilme.valor_unitario.length > 6
    ){
        return message.ERROR_INVALID_REQUIRED_FIELDS //400
    }else{

        let validateStatus = false

        //Validação da data de relançamentos, já que ela não é obrigatória no Banco de Dados
        if(dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != undefined){

            //Validação para verificar se a data está com a quantidade de dígitos correta
            if(dadosFilme.data_relancamento.length != 10){
                return message.ERROR_INVALID_REQUIRED_FIELDS //400
            }else{
                validateStatus = true
            }
        }else{
            validateStatus = true
        }

        //Validação para verificar se podemos encaminhar os dados para o DAO.
        if(validateStatus){
            let novoFilme = await filmeDAO.updateFilme(dadosFilme)

            //Validação para verificar se o DAO inseriu os dados no BD.
            if(novoFilme){


                novoFilmeJSON.filme = dadosFilme
                novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status
                novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message

                return novoFilmeJSON //201
            }else{
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    }
}

//função para excluir um filme.
const setExcluirFilme = async() => {

}

//função para retornar todos os filmes.
const getListarFilmes = async() => {
    let filmesJSON = {}

    //Chama a função do DAO para retornar os dados da tabela de filmes
    let dadosFilmes = await filmeDAO.selectAllFilmes()

    //Validação para verificar se existem dados
    if(dadosFilmes){

        if(dadosFilmes.length > 0 ){
             //Cria o JSON para devolver para o app
            filmesJSON.filmes = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.status_code = 200

            return filmesJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
       
    }else{
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getBuscarFilmeNome = async(filmeNome) => {
    let nome = filmeNome

    let filmesJSON = {}

    if(nome == '' || nome == undefined){
        return message.ERROR_INVALID_REQUIRED_FIELDS //400
    }else{
         //Encaminhar o nome para o DAO.
        let dadosFilmes = await filmeDAO.selectByNameFilme(filmeNome)

        //Validação para verificar se existem dados
        if(dadosFilmes){

            if(dadosFilmes.length > 0 ){
                 //Cria o JSON para devolver para o app
                filmesJSON.filme = dadosFilmes
                filmesJSON.status_code = 200

                return filmesJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
           
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

//função para buscar um filmes pelo Id.
const getBuscarFilme = async(id) => {
    //Recebe o id do filme em uma variável local
    let idFilme = id

    //Cria o objeto JSON
    let filmeJSON = {}

    //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID //400
    }else{
        //Encaminha o ID para o DAO buscar no BD
        let dadosFilme = await filmeDAO.selectByIdFilme(idFilme)

        //Verifica se o DAO retornou dados
        if(dadosFilme){

            //Validação para verificar a quantidade de itens encontrados
            if(dadosFilme.length > 0){
                //Cria o JSON para retorno
                filmeJSON.filme = dadosFilme
                filmeJSON.status_code = 200

                return filmeJSON
            }else{
                return message.ERROR_NOT_FOUND
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

module.exports={
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getBuscarFilmeNome
}