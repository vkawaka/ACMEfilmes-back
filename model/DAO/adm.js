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

const selectAllAdm = async() =>{
    try {
        let sql = `SELECT * FROM tbl_adm`

        let rsadm = await prisma.$queryRawUnsafe(sql)
        console.log(rsadm)
        return rsadm
        
    } catch (error) {
        return false
    }
}

const selectAdmById = async(id) => {
    try{
        let sql = `select * from tbl_adm where tbl_adm.id = ${id}`
    
        let rsadmId = await prisma.$queryRawUnsafe(sql)
    
       return rsadmId
    
        } catch(error){
            return false
        }
}

const insertAdm  = async(dadosAdm) => {
try {
    console.log(dadosAdm);
    let sql = `INSERT INTO tbl_adm (usuario, nome, senha, email, chefe) VALUES ("${dadosAdm.usuario}", "${dadosAdm.nome}", "${dadosAdm.senha}", "${dadosAdm.email}", ${dadosAdm.chefe})`
    console.log(sql);

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return result
    else
        return false
} catch (error) {
    return false
}
}

const updateAdm = async(id, dadosBody) => {
    try {
        let sql = `UPDATE tbl_adm SET usuario = '${dadosBody.usuario}', nome = '${dadosBody.nome}', senha = '${dadosBody.senha}', email = '${dadosBody.email}', chefe = ${dadosBody.chefe}  WHERE tbl_adm.id = ${id}`

        let rsupdateadm = await prisma.$queryRawUnsafe(sql)

        if(rsupdateadm)
            return rsupdateadm
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteAdm = async(id) => {
    try {
        let sql = `DELETE FROM tbl_adm WHERE tbl_adm.id = ${id}`

        let rsdeleted = prisma.$queryRawUnsafe(sql)
        return rsdeleted
    } catch (error) {
        return false
    }
}

const selectLastIdAdm =  async() =>{
    try {
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_adm limit 1`

        let rsIdfilme = await prisma.$queryRawUnsafe(sql)


        return rsIdfilme
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllAdm,
    selectAdmById,
    insertAdm,
    updateAdm,
    deleteAdm,
    selectLastIdAdm
}