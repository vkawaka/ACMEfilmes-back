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

const selectAllDiretores = async() =>{
    try {
        let sql = `SELECT * FROM tbl_diretor`

        let rsdiretor = await prisma.$queryRawUnsafe(sql)

        if (rsdiretor) {
            return rsdiretor
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectDiretorById = async(id) => {
    try{
        let sql = `select * from tbl_diretor where tbl_diretor.id = ${id}`
    
        let rsatorId = await prisma.$queryRawUnsafe(sql)
    
       return rsatorId
    
        } catch(error){
            return false
        }
}

const insertDiretor = async(dadosDiretor) => {
    try {
        let sql 
        if(dadosDiretor.biografia == '' || dadosDiretor.biografia == null || dadosDiretor.biografia == undefined){
            sql = `INSERT INTO tbl_diretor (nome, data_nascimento, id_sexo) VALUES 
            ("${dadosDiretor.nome}", 
            "${dadosDiretor.data_nascimento}",
            "${dadosDiretor.id_sexo}");`
        }else{
        sql = `INSERT INTO tbl_diretor (nome, data_nascimento, biografia, id_sexo) VALUES 
        ("${dadosDiretor.nome}", 
        "${dadosDiretor.data_nascimento}",
        "${dadosDiretor.biografia}",
        "${dadosDiretor.id_sexo}");`
        }
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

const updateDiretor = async(id, dadosBody) => {
    try {
        let sql
        if(dadosBody.biografia != '' && dadosBody.biografia != null && dadosBody.biografia != undefined){
            sql = `UPDATE tbl_diretor SET nome = '${dadosBody.nome}', data_nascimento = '${dadosBody.data_nascimento}', id_sexo = '${dadosBody.id_sexo}' WHERE tbl_diretor.id = ${id};`
        }else{
           sql = `UPDATE tbl_diretor SET nome = '${dadosBody.nome}', data_nascimento = '${dadosBody.data_nascimento}', biografia = ${dadosBody.biografia}, id_sexo = ${dadosBody.id_sexo} WHERE tbl_diretor.id = ${id};`
        }
        let rsupdatediretor = await prisma.$queryRawUnsafe(sql)

        if(rsupdatediretor)
            return rsupdatediretor
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteDiretor = async(id) => {
    try {
        let sql = `DELETE FROM tbl_diretor WHERE tbl_diretor.id = ${id}`

        let rsdeletedDiretor = prisma.$queryRawUnsafe(sql)
        return rsdeletedDiretor
    } catch (error) {
        return false
    }
}

const selectLastIdDiretor =  async() =>{
    try {
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_ator limit 1`

        let rsIdAtor = await prisma.$queryRawUnsafe(sql)


        return rsIdAtor
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllDiretores,
    selectDiretorById,
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectLastIdDiretor
}