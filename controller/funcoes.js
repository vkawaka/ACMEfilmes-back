var InfosFilmes = require('../module/filmes.js')
var ue = InfosFilmes.filmes

const getFilmes = () => {
    var arrayFilmes = ue.filmes
    var arrayFilmesT = []
    var status = false

    arrayFilmes.forEach(function(produto){
      var filmeInfo = {}

      filmeInfo.foto = produto.foto_capa
      filmeInfo.nome = produto.nome
      filmeInfo.valor = produto.valor_unitario
      
      arrayFilmesT.push(filmeInfo)
      status = true
    })

    if(status)
    return {arrayFilmesT}
    else
    return false
}

const getFilmeId = (idFilme) => {
    let arrayFilmes = ue.filmes 
    let array = []
    let status = false

    arrayFilmes.forEach(function(produto){
        let infoFilme = {}

        if(produto.id == idFilme){
            infoFilme.foto = produto.foto_capa
            infoFilme.nome = produto.nome
            infoFilme.sinopse = produto.sinopse
            infoFilme.tempo = produto.duracao
            infoFilme.lancamento = produto.data_lancamento
            infoFilme.valor = produto.valor_unitario

            array.push(infoFilme)
            status = true
        }
    })

    if(status)
    return {array}
    else
    return false
}


module.exports={
    getFilmes,
    getFilmeId
}