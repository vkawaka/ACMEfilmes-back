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

//função para retornar todos os filmes.
const getBuscarFilmeNome = async(filmeNome) => {
    let nome = filmeNome

    let filmesJSON = {}

    if(nome == '' || nome == undefined){
        return message.ERROR_INVALID_REQUEST //400
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