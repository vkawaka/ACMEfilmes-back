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

const selectUsuarioById = async(id) => {
    try{
        let sql = `select * from tbl_usuario where tbl_usuario.id = ${id}`
    
        let rsId = await prisma.$queryRawUnsafe(sql)
    
       return rsId
    
        } catch(error){
            return false
        }
}
const selectUsuarioByNome = async(nome) => {
    try{
        let sql = `select * from tbl_usuario where tbl_usuario.usuario LIKE "%${nome}%" or tbl_usuario.nome LIKE "%${nome}%"`
        console.log(sql);

    
        let rsId = await prisma.$queryRawUnsafe(sql)
    
       return rsId
    
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

const updateUsuario = async(id, dadosBody) => {
    try {
        let sql 
    if(dadosBody.foto == null || dadosBody.foto == undefined || dadosBody.foto == ''){
        sql = `UPDATE tbl_usuario SET usuario = "${dadosBody.usuario}", email = "${dadosBody.email}", senha = "${dadosBody.senha}", nome = "${dadosBody.nome}", foto = "https://i.pinimg.com/564x/5e/1a/d0/5e1ad070e230f8e7059a5957151ca730.jpg" WHERE tbl_usuario.id = ${id}`
    }else{
        sql = `UPDATE tbl_usuario SET usuario = "${dadosBody.usuario}", email = "${dadosBody.email}", senha = "${dadosBody.senha}", nome = "${dadosBody.nome}", foto = "${dadosBody.foto}" WHERE tbl_usuario.id = ${id}`

    }
    console.log(sql);

        let rsupdate = await prisma.$queryRawUnsafe(sql)

        if(rsupdate)
            return rsupdate
        else
            return false

    } catch (error) {
        console.log("aqui buaa");

        return false
    }
}

const deleteUsuario = async(id) => {
    try {
        let sql = `DELETE FROM tbl_usuario WHERE tbl_usuario.id = ${id}`

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
const insertFav = async(idUsuario, idFilme)=>{
    try {
        let sql = `INSERT INTO tbl_usuario_filme_fav (id_usuario, id_filme) VALUES ('${idUsuario}', '${idFilme}')`
        console.log(sql);

        let rs = await prisma.$executeRawUnsafe(sql)

        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}
const selectFilmesFav = async(id) => {
    try {
        let sql = `SELECT * FROM tbl_filme JOIN tbl_usuario_filme_fav ON tbl_filme.id = tbl_usuario_filme_fav.id_filme WHERE id_usuario = ${id}`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}
const selectFilmeFav = async(id, idU) => {
    try {
        let sql = `SELECT * FROM tbl_filme JOIN tbl_usuario_filme_fav ON tbl_filme.id = tbl_usuario_filme_fav.id_filme WHERE id_filme = ${id} AND id_usuario = ${idU}`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}
const deleteFilmeFav = async(id, idU) => {
    try {
        let sql = `DELETE FROM tbl_usuario_filme_fav WHERE id_filme = ${id} AND id_usuario = ${idU}`
        console.log("teste " + sql);


        let rs = await prisma.$queryRawUnsafe(sql)
        console.log(sql);
        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}


const insertAssistido = async(idUsuario, idFilme)=>{
    try {
        let sql = `INSERT INTO tbl_usuario_filme_assistido (id_usuario, id_filme) VALUES ('${idUsuario}', '${idFilme}')`
        console.log(sql);

        let rs = await prisma.$executeRawUnsafe(sql)

        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}
const selectFilmesAssistido = async(id) => {
    try {
        let sql = `SELECT * FROM tbl_filme JOIN tbl_usuario_filme_assistido ON tbl_filme.id = tbl_usuario_filme_assistido.id_filme WHERE id_usuario = ${id}`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}
const selectFilmeAssistido = async(id, idU) => {
    try {
        let sql = `SELECT * FROM tbl_filme JOIN tbl_usuario_filme_assistidp ON tbl_filme.id = tbl_usuario_filme_assistido.id_filme WHERE id_filme = ${id} AND id_usuario = ${idU}`

        let rsnacionalidade = await prisma.$queryRawUnsafe(sql)
        return rsnacionalidade
        
    } catch (error) {
        return false
    }
}
const deleteFilmeAssistido = async(id, idU) => {
    try {
        let sql = `DELETE FROM tbl_usuario_filme_assistido WHERE id_filme = ${id} AND id_usuario = ${idU}`
        console.log("teste " + sql);


        let rs = await prisma.$queryRawUnsafe(sql)
        console.log(sql);
        if(rs)
            return rs
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllUsuarios,
    selectUsuarioById,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectLastId,
    insertFav,
    selectFilmesFav,
    selectFilmeFav,
    deleteFilmeFav,
    insertAssistido,
    selectFilmesAssistido,
    selectFilmeAssistido,
    deleteFilmeAssistido,
    selectUsuarioByNome
}