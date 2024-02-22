/**
 * Objetivo: Arquivo responsável pela padronização de variáveis globais utilizadas no projeto.
 * Data: 22/02/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 */

/********************** MENSAGENS DE ERRO *************************/
 const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido'}
 const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados os itens na requisição.'}

 module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND
 }