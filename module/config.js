/**
 * Objetivo: Arquivo responsável pela padronização de variáveis globais utilizadas no projeto.
 * Data: 22/02/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 */

/********************** MENSAGENS DE ERRO *************************/
 const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido'}
 const ERROR_INVALID_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem campos que não foram preenchidos de acordo com os critérios de digitação, ou não foram preenchidos!'}
 const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados os itens na requisição.'}
 const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um problema na comunicação com o Banco de Dados. Contate o Administrador da API'}



 /********************** MENSAGENS DE SUCESSO ********************/
 const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso!'}
 

 module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INVALID_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM
 }