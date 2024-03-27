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
 const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Não foi possível executar a requisição devido a um problema na camada de negócio/controller do projeto. Contrate o Administrador da API.'}
 const ERROR_UNSUPORTED_CONTENT_TYPE = {status: false, status_code: 415, message: 'O content-type encaminhado na requisição não é permitido pelo servidor da API. Deve-se utiliza somente application/json'}



 /********************** MENSAGENS DE SUCESSO ********************/
 const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso!'}
 const SUCCESS_DELETED_ITEM= {status: true, status_code: 200, message: 'Item deletado com sucesso!'}
 const SUCCESS_UPDATED_ITEM = {status: true, status_code: 200, message: 'Item atualizado com sucesso!'}
 

 module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INTERNAL_SERVER,
    ERROR_INVALID_REQUIRED_FIELDS,
    ERROR_UNSUPORTED_CONTENT_TYPE,
    SUCCESS_CREATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATED_ITEM
 }