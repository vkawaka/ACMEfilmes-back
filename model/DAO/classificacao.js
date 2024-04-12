/***************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados SQL, aqui faremos o CRUD na tabela de genero.
 * Data: 1/2/24
 * Autor: Nathalia Kawakami
 * Versão: 1.0
 **************************************************************************************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const { PrismaClientExtends } = require('@prisma/client/extension')

const prisma = new PrismaClient()

const insertClassificacao = async(dadosClassificacao) => {
    try {
        let sql = `INSERT INTO tbl_classificacao (faixa_etaria, classificacao, caracteristica, icone) VALUES
        ('${dadosClassificacao.faixa_etaria}', "${dadosClassificacao.classificacao}", "${dadosClassificacao.caracteristica}", "${dadosClassificacao.icone}")`

        let rsClassificacao = await prisma.$executeRawUnsafe(sql)

        if(rsClassificacao)
            return rsClassificacao
        else
            return false
    } catch (error) {
        return false
    }
}
const selectAllClassificacao = async() => {
    try {
        let sql = `SELECT * FROM tbl_classificacao`

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        if(rsClassificacao)
            return rsClassificacao
        else
            return false

    } catch (error) {
        return false
    }
}
const selectClassificacaoById = async(id) => {
    try {
        let sql = `SELECT * FROM tbl_classificacao WHERE tbl_classificacao.id = ${id}`
        let rsClassi = await prisma.$queryRawUnsafe(sql)

        if(rsClassi)
            return rsClassi
        else 
            return false
    } catch (error) {
        return false
    }
}
const deleteClassificacao = async(id) => {
    try {
        let sql = `DELETE FROM tbl_classificacao WHERE tbl_classificacao.id = ${id}`

        let rsdeletedClassificacao = prisma.$queryRawUnsafe(sql)
        return rsdeletedClassificacao
    } catch (error) {
        return false
    }
}
const updateClassificacao = async(dados) => {
   try {
    let sql = `UPDATE tbl_classificacao SET 
    faixa_etaria = ${dados.faixa_etaria}, 
    classificacao = ${dados.classificacao}, 
    caracteristica = ${dados.classificacao}, 
    icone = ${dados.icone} 
    WHERE tbl_classificacao = ${dados.id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return result
    else
        return false
   } catch (error) {
    return false
   }
}
const selectLastId = async() => {
    try {
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_classificacao limit 1`

        let rsIdClassificacao = await prisma.$queryRawUnsafe(sql)


        return rsIdClassificacao
    } catch (error) {
        return false
    }
}

module.exports={
    insertClassificacao,
    selectAllClassificacao,
    selectClassificacaoById,
    deleteClassificacao,
    updateClassificacao,
    selectLastId
}