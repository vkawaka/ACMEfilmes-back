/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisições da API de Filme.
 * Data: 1/2/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 ********************************************************************************************************/



//Import o arquivo DAO que fará a comunicação com o banco de dados.
const filmeDAO = require('../model/DAO/filme.js')
const atorDAO = require('../model/DAO/ator.js')
const diretorDAO = require('../model/DAO/diretor.js')
const generoDAO = require('../model/DAO/genero.js')
const classificacaoDAO = require('../model/DAO/classificacao.js')
const usuarioDAO = require('../model/DAO/usuario.js')

//Import o arquivo config do projeto.
const message = require('../module/config.js')

//Função para validar e inserir um novo filme.
const setInserirNovoFilme = async(dadosFilme, contentType) => {

    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            let novoFilmeJSON = {}
            let atorArray = dadosFilme.ator
            let diretorArray = dadosFilme.diretor
            let generoArray = dadosFilme.genero
            if(dadosFilme.nome == ''                     || dadosFilme.nome == undefined            || dadosFilme.nome == null            || dadosFilme.nome.length > 80       ||
            dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined         || dadosFilme.sinopse == null         || dadosFilme.sinopse.length > 65000 ||
            dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined         || dadosFilme.duracao == null         || dadosFilme.duracao.length > 8     ||
            dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10   ||
            dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa == null       || dadosFilme.foto_capa.length > 200 ||
            dadosFilme.midia_fundo == ''                || dadosFilme.midia_fundo == undefined       || dadosFilme.midia_fundo == null       || dadosFilme.midia_fundo.length > 65000 ||
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
                        let idFilme = idDAO[0].id
                        console.log(idFilme)
                        
                        for (let index = 0; index < generoArray.length; index++) {
                            const element = generoArray[index];
                            await generoDAO.insertFilmeGenero(idFilme, element)
                        }

                        for (let index = 0; index < atorArray.length; index++) {
                            const element = atorArray[index];
                            await atorDAO.insertFilmeAtor(idFilme, element)
                        }

                        for (let index = 0; index < diretorArray.length; index++) {
                            const element = diretorArray[index];
                            await diretorDAO.insertFilmeDiretor(idFilme, element)
                        }

                        let gen = await generoDAO.selectGeneroByFilme(idFilme)
                        console.log(gen);
                        dadosFilme.genero = gen
                        let ator = await atorDAO.selectAtorByFilme(idFilme)
                        dadosFilme.ator = ator
                        let diretor = await diretorDAO.selectDiretorByFilme(idFilme)
                        dadosFilme.diretor = diretor

                        let classi = await classificacaoDAO.selectClassificacaoById(dadosFilme.id_classificacao)
                        delete dadosFilme.id_classificacao
                        dadosFilme.classificacao = classi
                        dadosFilme.id = idDAO[0].id

                        // let fav = await usuarioDAO.selectFilmeFav(idDAO[0].id, id)

                        console.log(dadosFilme);

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
        }else{
            return message.ERROR_UNSUPORTED_CONTENT_TYPE //415
        }
    }catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }

}


//Função para validar e atualizar um filme.
const setAtualizarFilme = async(id, dadosFilme, contentType) => {
    try {
        
    if(String(contentType).toLowerCase() == 'application/json'){
        let novoFilmeJSON = {}
        let atorArray = dadosFilme.ator
        let diretorArray = dadosFilme.diretor
        let generoArray = dadosFilme.genero

        let idFilme = id
        if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
            return message.ERROR_INVALID_ID
        }else{
            if(dadosFilme.nome == ''                     || dadosFilme.nome == undefined            || dadosFilme.nome == null            || dadosFilme.nome.length > 80       ||
            dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined         || dadosFilme.sinopse == null         || dadosFilme.sinopse.length > 65000 ||
            dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined         || dadosFilme.duracao == null         || dadosFilme.duracao.length > 8     ||
            dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10   ||
            dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa == null       || dadosFilme.foto_capa.length > 200 ||
            dadosFilme.midia_fundo == ''                || dadosFilme.midia_fundo == undefined       || dadosFilme.midia_fundo == null       || dadosFilme.midia_fundo.length > 65000 ||
            dadosFilme.valor_unitario.length > 6 ||
            dadosFilme.id_classificacao == '' || dadosFilme.id_classificacao == undefined || isNaN(dadosFilme.id_classificacao)
            ){
                return message.ERROR_INVALID_REQUIRED_FIELDS //400
            }else{

                let validateStatus = false

                let filmeById = await filmeDAO.selectByIdFilme(idFilme)

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

                if(filmeById.length > 0){
                      //Validação para verificar se podemos encaminhar os dados para o DAO.
                    if(validateStatus){
                        dadosFilme.id = idFilme

                        let novoFilme = await filmeDAO.updateFilme(dadosFilme)

                        //Validação para verificar se o DAO inseriu os dados no BD.
                        if(novoFilme){
                            await generoDAO.deleteFilmeGenero(idFilme)
                            await atorDAO.deleteFilmeAtor(idFilme)
                            await diretorDAO.deleteFilmeDiretor(idFilme)


                            for (let index = 0; index < generoArray.length; index++) {
                                const element = generoArray[index];
                                await generoDAO.insertFilmeGenero(idFilme, element)
                            }
    
                            for (let index = 0; index < atorArray.length; index++) {
                                const element = atorArray[index];
                                await atorDAO.insertFilmeAtor(idFilme, element)
                            }
    
                            for (let index = 0; index < diretorArray.length; index++) {
                                const element = diretorArray[index];
                                await diretorDAO.insertFilmeDiretor(idFilme, element)
                            }
    
    
                            let gen = await generoDAO.selectGeneroByFilme(idFilme)
                            dadosFilme.genero = gen
                            let ator = await atorDAO.selectAtorByFilme(idFilme)
                            dadosFilme.ator = ator
                            let diretor = await diretorDAO.selectDiretorByFilme(idFilme)
                            dadosFilme.diretor = diretor
    
                            let classi = await classificacaoDAO.selectClassificacaoById(dadosFilme.id_classificacao)
                            delete dadosFilme.id_classificacao
                            dadosFilme.classificacao = classi    


                            novoFilmeJSON.filme = dadosFilme
                            novoFilmeJSON.status = message.SUCCESS_UPDATED_ITEM.status
                            novoFilmeJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                            novoFilmeJSON.message = message.SUCCESS_UPDATED_ITEM.message

                            return novoFilmeJSON //201
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB //500
                        }
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }
        }
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//função para excluir um filme.
const setExcluirFilme = async(id) => {
   try {
     //Recebe o id do filme em uma variável local
     let idFilme = id

     //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
     if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
         return message.ERROR_INVALID_ID //400
     }else{
        let filmeById = await filmeDAO.selectByIdFilme(idFilme)

        if(filmeById.length > 0){
            await atorDAO.deleteFilmeAtor(idFilme)
            await diretorDAO.deleteFilmeDiretor(idFilme)
            await generoDAO.deleteFilmeGenero(idFilme)
            let filmeDeletado = await filmeDAO.deleteFilme(idFilme)
 
            if(filmeDeletado){
                return message.SUCCESS_DELETED_ITEM
            }else{
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }else{
            return message.ERROR_NOT_FOUND //404
        }
    }
   } catch (error) {
    return message.ERROR_INTERNAL_SERVER //500
   }
}

//função para retornar todos os filmes.
const getListarFilmes = async() => {
    let filmesJSON = {}

    //Chama a função do DAO para retornar os dados da tabela de filmes
    let dadosFilmes = await filmeDAO.selectAllFilmes()

    //Validação para verificar se existem dados
    if(dadosFilmes){

        if(dadosFilmes.length > 0 ){
            for (let index = 0; index < dadosFilmes.length; index++) {
                const element = dadosFilmes[index];
                let gen = await generoDAO.selectGeneroByFilme(element.id)
                element.genero = gen
                let ator = await atorDAO.selectAtorByFilme(element.id)
                element.ator = ator
                let diretor = await diretorDAO.selectDiretorByFilme(element.id)
                element.diretor = diretor

                let classi = await classificacaoDAO.selectClassificacaoById(element.id_classificacao)
                delete element.id_classificacao
                element.classificacao = classi
            }

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
const getListarFilmesUsuario = async(id) => {
    let filmesJSON = {}

    //Chama a função do DAO para retornar os dados da tabela de filmes
    let dadosFilmes = await filmeDAO.selectAllFilmes()

    //Validação para verificar se existem dados
    if(dadosFilmes){

        if(dadosFilmes.length > 0 ){
            for (let index = 0; index < dadosFilmes.length; index++) {
                const element = dadosFilmes[index];
                let gen = await generoDAO.selectGeneroByFilme(element.id)
                element.genero = gen
                let ator = await atorDAO.selectAtorByFilme(element.id)
                element.ator = ator
                let diretor = await diretorDAO.selectDiretorByFilme(element.id)
                element.diretor = diretor

                let classi = await classificacaoDAO.selectClassificacaoById(element.id_classificacao)
                delete element.id_classificacao
                element.classificacao = classi

                let fav = await usuarioDAO.selectFilmeFav(element.id, id)
                element.favorito = false
                for (let index = 0; index < fav.length; index++) {
                    const verify = fav[index];
                    if (verify.id_filme == element.id) {
                        element.favorito = true
                    }
                }
                let assistido = await usuarioDAO.selectFilmeAssistido(element.id, id)
                element.assistido = false
                for (let index = 0; index < assistido.length; index++) {
                    const verify = assistido[index];
                    if (verify.id_filme == element.id) {
                        element.assistido = true
                    }
                }
            }

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
                if(dadosFilmes.length > 0 ){
                    for (let index = 0; index < dadosFilmes.length; index++) {
                        const element = dadosFilmes[index];
                        let gen = await generoDAO.selectGeneroByFilme(element.id)
                        console.log(gen);
                        element.genero = gen
                        let ator = await atorDAO.selectAtorByFilme(element.id)
                        element.ator = ator
                        let diretor = await diretorDAO.selectDiretorByFilme(element.id)
                        element.diretor = diretor
        
                        let classi = await classificacaoDAO.selectClassificacaoById(element.id_classificacao)
                        delete element.id_classificacao
                        element.classificacao = classi

                        
                    }

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
                let element = dadosFilme[0]
                let gen = await generoDAO.selectGeneroByFilme(element.id)
                        console.log(gen);
                        element.genero = gen
                        let ator = await atorDAO.selectAtorByFilme(element.id)
                        element.ator = ator
                        let diretor = await diretorDAO.selectDiretorByFilme(element.id)
                        element.diretor = diretor
        
                        let classi = await classificacaoDAO.selectClassificacaoById(element.id_classificacao)
                        delete element.id_classificacao
                        element.classificacao = classi
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

const getBuscarFilmeUsuario = async(id, idU) => {
    //Recebe o id do filme em uma variável local
    let idFilme = id
    let idUsuario = idU

    //Cria o objeto JSON
    let filmeJSON = {}

    //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme) || idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)){
        return message.ERROR_INVALID_ID //400
    }else{
        //Encaminha o ID para o DAO buscar no BD
        let dadosFilme = await filmeDAO.selectByIdFilme(idFilme)

        //Verifica se o DAO retornou dados
        if(dadosFilme){

            //Validação para verificar a quantidade de itens encontrados
            if(dadosFilme.length > 0){
                let element = dadosFilme[0]
                let gen = await generoDAO.selectGeneroByFilme(element.id)
                        console.log(gen);
                        element.genero = gen
                        let ator = await atorDAO.selectAtorByFilme(element.id)
                        element.ator = ator
                        let diretor = await diretorDAO.selectDiretorByFilme(element.id)
                        element.diretor = diretor
        
                        let classi = await classificacaoDAO.selectClassificacaoById(element.id_classificacao)
                        delete element.id_classificacao
                        element.classificacao = classi

                        let fav = await usuarioDAO.selectFilmeFav
                
                
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
    getBuscarFilmeNome,
    getListarFilmesUsuario,
    getBuscarFilmeUsuario
}

