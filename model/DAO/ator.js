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

const selectAllAtores = async() =>{
    try {
        let sql = `SELECT * FROM tbl_ator`

        let rsator = await prisma.$queryRawUnsafe(sql)
        console.log(rsator)
        return rsator
        
    } catch (error) {
        return false
    }
}

const selectAtorById = async(id) => {
    try{
        let sql = `select * from tbl_ator where tbl_ator.id = ${id}`
    
        let rsatorId = await prisma.$queryRawUnsafe(sql)
    
       return rsatorId
    
        } catch(error){
            return false
        }
}

const insertAtor = async(dadosAtor) => {
try {
    let sql 
    if(dadosAtor.biografia == '' && dadosAtor.biografia == null && dadosAtor.biografia == undefined){
        sql = `INSERT INTO tbl_ator (nome, data_nascimento, id_sexo) VALUES 
        ("${dadosAtor.nome}", 
        "${dadosAtor.data_nascimento}",
        "${dadosAtor.id_sexo}");`
    }else{
       sql = `INSERT INTO tbl_ator (nome, data_nascimento, biografia, id_sexo) VALUES 
       ("${dadosAtor.nome}", 
       "${dadosAtor.data_nascimento}",
       "${dadosAtor.biografia}",
       "${dadosAtor.id_sexo}");`
    }
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return result
    else
        return false
} catch (error) {
    return false
}
}

const updateAtor = async(id, dadosBody) => {
    try {
        let sql
        if(dadosBody.biografia != '' && dadosBody.biografia != null && dadosBody.biografia != undefined){
            sql = `UPDATE tbl_ator SET nome = '${dadosBody.nome}', data_nascimento = '${dadosBody.data_nascimento}', id_sexo = '${dadosBody.id_sexo}' WHERE tbl_ator.id = ${id};`
        }else{
           sql = `UPDATE tbl_ator SET nome = '${dadosBody.nome}', data_nascimento = '${dadosBody.data_nascimento}', biografia = ${dadosBody.biografia}, id_sexo = ${dadosBody.id_sexo} WHERE tbl_ator.id = ${id};`
        }
        let rsupdateator = await prisma.$queryRawUnsafe(sql)

        if(rsupdateator)
            return rsupdateator
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteAtor = async(id) => {
    try {
        let sql = `DELETE FROM tbl_ator WHERE tbl_ator.id = ${id}`

        let rsdeletedAtor = prisma.$queryRawUnsafe(sql)
        return rsdeletedAtor
    } catch (error) {
        return false
    }
}

const selectLastIdAtor =  async() =>{
    try {
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_ator limit 1`

        let rsIdAtor = await prisma.$queryRawUnsafe(sql)


        return rsIdAtor
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllAtores,
    selectAtorById,
    insertAtor,
    updateAtor,
    deleteAtor,
    selectLastIdAtor
}