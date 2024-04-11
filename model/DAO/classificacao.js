/***************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados SQL, aqui faremos o CRUD na tabela de genero.
 * Data: 1/2/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 **************************************************************************************************************************************************************************************/

//Importa da biblioteca do prisma client para manipular scripts sql. Tem que ser essse nome todas as vezes, porque se não dá errado.
const { PrismaClient } = require('@prisma/client')

//Instância da classe PrismaClient.
const prisma = new PrismaClient()

const insertClassificacao = async() => {

}
const selectAllClassificacao = async() => {
    
}
const selectClassificacaoById = async() => {
    
}
const deleteClassificacao = async() => {
    
}
const updateClassificacao = async() => {
    
}
const selectLastId = async() => {
    
}

module.exports={
    insertClassificacao,
    selectAllClassificacao,
    selectClassificacaoById,
    deleteClassificacao,
    updateClassificacao,
    selectLastId
}