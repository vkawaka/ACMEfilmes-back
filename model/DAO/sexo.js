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

const selectAllSexo = async() => {
    try {
        let sql = `SELECT * FROM tbl_sexo`

        let rsgenero = await prisma.$queryRawUnsafe(sql)
        console.log(rsgenero)
        return rsgenero
        
    } catch (error) {
        return false
    }
}

const selectSexoById = async(id) => {
    try {
        let sql = `SELECT * FROM tbl_sexo WHERE id = ${id}`

        let rsgenero = await prisma.$queryRawUnsafe(sql)
        return rsgenero
        
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllSexo,
    selectSexoById,
}