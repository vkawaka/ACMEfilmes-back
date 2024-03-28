create database db_acme_filmes_turma_bb;

use db_acme_filmes_turma_bb;


create table tbl_filme(
	id int not null auto_increment primary key,
	nome varchar(80) not null,
	sinopse text not null,
	duracao time not null,
	data_lancamento date not null,
	data_relancamento date,
	foto_capa varchar(200) not null,
    midia_fundo text not null,
	valor_unitario float,
    
    unique key(id),
    unique index(id)
);

drop table tbl_teste;

show tables;

#permite visualizar a estrutura de uma tabela
desc tbl_filme;
describe tbl_filme;

insert into tbl_filme (
	nome, 
	sinopse, 
    duracao, 
    data_lancamento, 
    data_relancamento, 
    foto_capa,
    midia_fundo,
    valor_unitario
    ) values
("Ponyo - Uma Amizade que Veio do Mar", 
"Sosuke (Hiroki Doi) é um garoto de cinco anos que mora em um penhasco, com vista para o Mar Interior. Um dia, ao brincar na praia, encontra Ponyo (Yuria Nara), uma peixinho dourado cuja cabeça está presa em um pote de geleia. Ele salva a peixinho e a coloca em um balde verde. Trata-se de amor à primeira vista, já que Sosuke promete que irá cuidar dela. Só que Fujimoto (Jôji Tokoro), que um dia foi humano e hoje é feiticeiro no fundo do mar, exige que Ponyo retorne às profundezas do oceano. Para ficar ao lado de Sosuke, Ponyo toma a decisão de tornar-se humana.",
"01:41:00",
"2010-07-30",
null,
"https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/87/90/53/19962752.asp.jpg",
"https://64.media.tumblr.com/cdcabaa475940b399ac8a7b22fed81b8/4ea12905a57ada35-7b/s540x810/55897e69da6d31ba4502cefc4618b3d5e921e00f.gifv",
'19.00'
),
("Perfect Blue", 
"Mima Kirigoe é uma cantora pop de uma banda CHAM!, mas decide se tornar uma atriz, tendo como primeiro projeto uma série de crime dramática. Muitos de seus fãs ficam chateados com sua decisão e uns deles, obcecado por Mima, começa a perseguí-la e a enviar mensagens a chamando de traidora. Decidida a ignorar tais fatos, ela se preocupa com sua personagem na série que sofrerá um sequestro em um dos episódios. Sem ter noção da possibilidade de ser afetada pela cena, Mima fica traumatizada e começa a não saber distinguir a realidade da ficção. Seu problema maior começa quando seus colegas de trabalho são assassinados e as provas apontam para ela mesma.",
"01:21:00",
"1997-03-16",
"1998-02-28",
"https://br.web.img3.acsta.net/c_310_420/pictures/15/07/13/20/20/095093.jpg",
"https://64.media.tumblr.com/6914cc50045d076b6ef1e7f223e883df/6c0b616980d56810-1c/s540x810/c5c5c7a67aff24cbfce5b31cbe732beb36856bd2.gifv",
'9.50'
);

select * from tbl_filme;

delete from tbl_filme where tbl_filme.id = 3;

drop table tbl_filme;
