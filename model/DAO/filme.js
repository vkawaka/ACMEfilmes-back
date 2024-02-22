/***************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados SQL, aqui faremos o CRUD na tabela de filme.
 * Data: 1/2/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 **************************************************************************************************************************************************************************************/

//Importa da biblioteca do prisma client para manipular scripts sql. Tem que ser essse nome todas as vezes, porque se não dá errado.
const { PrismaClient } = require('@prisma/client')

//Instância da classe PrismaClient.
const prisma = new PrismaClient()


//Função para inserir um filme no banco de dados.
const insertFilme = async() => {

}

//Função para atualizar um filme no BD.
const updateFilme = async() => {

}

//função para excluir um filme no BD.
const deleteFilme = async() =>{

}

//Função para listar todos os filmes do BD.
const selectAllFilmes = async() => {
   try {
    let sql = 'select * from tbl_filme'
    
    let rsfilmes = await prisma.$queryRawUnsafe(sql)

    return rsfilmes

   } catch (error) {

    return false
   }
   
}

//Função para bbuscar um filme no BD pelo nome
const selectByNameFilme = async(nome) => {
    try {
        let sql = `select * from tbl_filme where tbl_filme.nome like "%${nome}%"`

        let rsfilmeNome = await prisma.$queryRawUnsafe(sql)
    
        return rsfilmeNome
        
    } catch (error) {

        return false
    }
    
}

//Função para buscar um filme no Bd pelo Id.
const selectByIdFilme = async(id) => {
    try{

    //Script sql para filtrar pelo id
    let sql = `select * from tbl_filme where tbl_filme.id = ${id}`

    //Executa o sql no banco de dados
    let rsfilmeId = await prisma.$queryRawUnsafe(sql)

   return rsfilmeId

    } catch(error){
        return false
    }
}

module.exports ={
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNameFilme
}