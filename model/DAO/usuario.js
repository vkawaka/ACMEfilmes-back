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

const selectAllUsuarios = async() =>{
    try {
        let sql = `SELECT * FROM tbl_usuario`

        let rsusuario = await prisma.$queryRawUnsafe(sql)
        console.log(rsusuario)
        return rsusuario
        
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

const insertUsuario  = async(dados) => {
try {
    let sql 
    if(dados.foto == null || dados.foto == undefined || dados.foto == ''){
        sql = `INSERT INTO tbl_usuario (usuario, email, senha, nome, foto) VALUES ("${dados.usuario}", "${dados.email}", "${dados.senha}", "${dados.nome}", " https://i.pinimg.com/564x/5e/1a/d0/5e1ad070e230f8e7059a5957151ca730.jpg");`

    }else{
        sql = `INSERT INTO tbl_usuario (usuario, email, senha, nome, foto) VALUES ("${dados.usuario}", "${dados.email}", "${dados.senha}", "${dados.nome}", "${dados.foto}");`   
    }
    console.log(sql);

    let result = await prisma.$executeRawUnsafe(sql)
    console.log(result);

    if(result)
        return result
    else
        return false
} catch (error) {
    console.log("aqui");
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

const selectLastId =  async() =>{
    try {
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_usuario limit 1`

        let rsIdfilme = await prisma.$queryRawUnsafe(sql)


        return rsIdfilme
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllUsuarios,
    selectAdmById,
    insertUsuario,
    updateAdm,
    deleteAdm,
    selectLastId
}