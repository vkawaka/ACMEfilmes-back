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

const selectAllNacionalidades = async() => {
    try {
        let sql = `SELECT * FROM tbl_nacionalidade`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        console.log(rsnacionalidade)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByAtor = async(id) => {
    try {
        let sql = `SELECT tbl_nacionalidade.id, nome FROM tbl_nacionalidade JOIN tbl_ator_nacionalidade ON tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade WHERE id_ator = ${id}`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByAtorU = async(id_ator) => {
    try {
        let sql = `SELECT id FROM tbl_ator_nacionalidade WHERE id_ator = ${id_ator};`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByDiretor = async(id) => {
    try {
        let sql = `SELECT tbl_diretor_nacionalidade.id, nome FROM tbl_diretor_nacionalidade JOIN tbl_nacionalidade ON tbl_diretor_nacionalidade.id = tbl_nacionalidade.id WHERE id_diretor = ${id}`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        console.log(rsnacionalidade)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}

const insertAtorNacionalidade = async(id_ator, id_nacionalidade) => {
    try {
        let sql = `INSERT INTO tbl_ator_nacionalidade (id_ator, id_nacionalidade) VALUES ('${id_ator}', '${id_nacionalidade}')`
        console.log(sql);

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}

const updateAtorNacionalidade = async(id, id_ator, id_nacionalidade) => {
    try {
        let sql = `UPDATE tbl_ator_nacionalidade SET id_ator = '${id_ator}', id_nacionalidade = '${id_nacionalidade}' WHERE tbl_ator_nacionalidade.id = ${id};`
        console.log(sql);

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}

const insertDiretorNacionalidade = async(id_diretor, id_nacionalidade) => {
    try {
        let sql = `INSERT INTO tbl_diretor_nacionalidade (id_ator, id_nacionalidade) VALUES ('${id_diretor}', '${id_nacionalidade}')`

        let rsnacionalidade = await prisma.$executeRawUnsafe(sql)

        if(rsnacionalidade)
            return rsnacionalidade
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllNacionalidades,
    selectNacionalidadeByAtor,
    selectNacionalidadeByDiretor,
    insertAtorNacionalidade,
    insertDiretorNacionalidade,
    updateAtorNacionalidade,
    selectNacionalidadeByAtorU
}