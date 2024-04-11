-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_acme_filmes_turma_bb`;
USE `db_acme_filmes_turma_bb`;

DROP SCHEMA `db_acme_filmes_turma_bb`;
-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_classificacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_classificacao` (
  id INT NOT NULL AUTO_INCREMENT,
  faixa_etaria INT NOT NULL DEFAULT '0',
  classificacao VARCHAR(45) NOT NULL,
  caracteristica VARCHAR(200) NULL,
  icone TEXT NOT NULL,
  PRIMARY KEY (id)
  );
  
ALTER TABLE `db_acme_filmes_turma_bb`.`tbl_classificacao`
ADD `icone` VARCHAR(45) AFTER `caracteristica`;

DROP TABLE tbl_classificacao;

INSERT INTO `db_acme_filmes_turma_bb`.`tbl_classificacao` (`faixa_etaria`, `classificacao`, `caracteristica`, `icone`) VALUES
('0', "Livre para todos os públicos", "Não expõe a criança a conteúdos potencialmente prejudiciais", "https://shorturl.at/mQRVY");

UPDATE `db_acme_filmes_turma_bb`.`tbl_classificacao` SET `icone`= "https://shorturl.at/mQRVY" WHERE `tbl_classificacao`.`id` = 1;


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_filme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_filme` (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  sinopse TEXT NOT NULL,
  data_lancamento DATE NOT NULL,
  data_relancamento DATE NULL,
  valor_unitario FLOAT NOT NULL,
  duracao TIME NOT NULL,
  foto_capa VARCHAR(200) NOT NULL,
  midia_fundo TEXT NOT NULL,
  id_classificacao INT NOT NULL,
  
  PRIMARY KEY (id),
  
CONSTRAINT `fk_classificacao_filme`
FOREIGN KEY (`id_classificacao`)
REFERENCES `db_acme_filmes_turma_bb`.`tbl_classificacao` (`id`)
);

INSERT INTO `db_acme_filmes_turma_bb`.`tbl_filme` (nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, midia_fundo, valor_unitario, id_classificacao) VALUES
("Ponyo - Uma Amizade que Veio do Mar", 
"Sosuke (Hiroki Doi) é um garoto de cinco anos que mora em um penhasco, com vista para o Mar Interior. Um dia, ao brincar na praia, encontra Ponyo (Yuria Nara), uma peixinho dourado cuja cabeça está presa em um pote de geleia. Ele salva a peixinho e a coloca em um balde verde. Trata-se de amor à primeira vista, já que Sosuke promete que irá cuidar dela. Só que Fujimoto (Jôji Tokoro), que um dia foi humano e hoje é feiticeiro no fundo do mar, exige que Ponyo retorne às profundezas do oceano. Para ficar ao lado de Sosuke, Ponyo toma a decisão de tornar-se humana.",
"01:41:00",
"2010-07-30",
null,
"https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/87/90/53/19962752.asp.jpg",
"https://64.media.tumblr.com/cdcabaa475940b399ac8a7b22fed81b8/4ea12905a57ada35-7b/s540x810/55897e69da6d31ba4502cefc4618b3d5e921e00f.gifv",
'19.00',
'1'
);

-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_ator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_ator` (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  nacionalidade VARCHAR(60) NOT NULL,
  data_nascimento DATE NULL,
  biografia TEXT NULL,
  PRIMARY KEY (`id`)
  );

-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_diretor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_diretor` (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  nacionalidade VARCHAR(60) NOT NULL,
  data_nascimento DATE NULL,
  biografia TEXT NULL,
  PRIMARY KEY (`id`)
  );


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_genero` (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  descricao VARCHAR(100) NULL,
  PRIMARY KEY (`id`)
  );

SELECT * FROM tbl_genero;

ALTER TABLE tbl_genero
	MODIFY COLUMN descricao VARCHAR(255);

-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_filme_genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_filme_genero` (
  id INT NOT NULL AUTO_INCREMENT,
  id_filme INT NOT NULL,
  id_genero INT NOT NULL,
  
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_filme_filmegenero`
  FOREIGN KEY (`id_filme`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_filme` (`id`),
  CONSTRAINT `fk_genero_filmegenero`
  FOREIGN KEY (`id_genero`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_genero` (`id`)
);


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_filme_diretor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_filme_diretor` (
  id INT NOT NULL AUTO_INCREMENT,
  id_filme INT NOT NULL,
  id_diretor INT NOT NULL,
  
  PRIMARY KEY (`id`),
  
  CONSTRAINT `fk_filme_filmediretor`
  FOREIGN KEY (`id_filme`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_filme` (`id`),
  CONSTRAINT `fk_diretor_filmediretor`
  FOREIGN KEY (`id_diretor`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_diretor` (`id`)
);


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_filme_ator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_filme_ator` (
  id INT NOT NULL AUTO_INCREMENT,
  id_filme INT NOT NULL,
  id_ator INT NOT NULL,
 
  PRIMARY KEY (`id`),
 
 CONSTRAINT `fk_filme_filmeator`
  FOREIGN KEY (`id_filme`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_filme` (`id`),
  CONSTRAINT `fk_ator_filmeator`
  FOREIGN KEY (`id_ator`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_ator` (`id`)
);

#quebra a relação entre filme e ator, desamarrando a tabela das outras
#ALTER TABLE `tbl_filme_ator`
#	DROP FOREIGN KEY fk_filme_filmeator;
    
#cria uma relação entre filme e ator, amarrando a tabela em outras
#ALTER TABLE `tbl_filme_ator`
#	ADD FOREIGN KEY fk_filme_filmeator
#	FOREIGN KEY (id_filme)
#	REFERENCES tbl_filme(id);



-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_nacionalidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_nacionalidade` (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
  );

-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_sexo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_sexo` (
  id INT NOT NULL AUTO_INCREMENT,
  sigla VARCHAR(1) NOT NULL,
  nome VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`)
  );


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_ator_sexo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_ator_sexo` (
  id INT NOT NULL AUTO_INCREMENT,
  id_ator INT NOT NULL,
  id_sexo INT NOT NULL,

  PRIMARY KEY (`id`),
 
  CONSTRAINT `fk_ator_atorsexo`
  FOREIGN KEY (`id_ator`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_ator` (`id`),
  CONSTRAINT `fk_sexo_atorsexo`
  FOREIGN KEY (`id_sexo`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_sexo` (`id`)
);


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_diretor_sexo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_diretor_sexo` (
  id INT NOT NULL AUTO_INCREMENT,
  id_diretor INT NOT NULL,
  id_sexo INT NOT NULL,
 
  PRIMARY KEY (`id`),
  
  CONSTRAINT `fk_diretor_diretorsexo`
  FOREIGN KEY (`id_diretor`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_diretor` (`id`),
  CONSTRAINT `fk_sexo_diretorsexo`
  FOREIGN KEY (`id_sexo`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_sexo` (`id`)
);


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_ator_nacionalidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_ator_nacionalidade` (
  id INT NOT NULL AUTO_INCREMENT,
  id_ator INT NOT NULL,
  id_nacionalidade INT NOT NULL,
  
  PRIMARY KEY (`id`),
  
  CONSTRAINT `fk_ator_atornacionalidade`
  FOREIGN KEY (`id_ator`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_ator` (`id`),
  CONSTRAINT `fk_nacionalidade_atornacionalidade`
  FOREIGN KEY (`id_nacionalidade`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_nacionalidade` (`id`)
);


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_diretor_nacionalidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_diretor_nacionalidade` (
  id INT NOT NULL AUTO_INCREMENT,
  id_diretor INT NOT NULL,
  id_nacionalidade INT NOT NULL,

  PRIMARY KEY (`id`),
  
  CONSTRAINT `fk_diretor_diretornacionalidade`
  FOREIGN KEY (`id_diretor`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_diretor` (`id`),
  CONSTRAINT `fk_nacionalidade_diretornacionalidade`
  FOREIGN KEY (`id_nacionalidade`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_nacionalidade` (`id`)
);

-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_usuario` (
  id INT NOT NULL AUTO_INCREMENT,
  usuario VARCHAR(16) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(32) NOT NULL,
  nome VARCHAR(100) NULL,
  foto VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
  );


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_usuario_filme_fav`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_usuario_filme_fav` (
  id INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NULL,
  id_filme INT NULL,
  PRIMARY KEY (`id`),
  
  CONSTRAINT `fk_usuario_fav`
  FOREIGN KEY (`id_usuario`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_usuario` (`id`),
  CONSTRAINT `fk_filme_fav`
  FOREIGN KEY (`id_filme`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_filme` (`id`)
);


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_usuario_filme_assistido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_usuario_filme_assistido` (
  id INT NOT NULL AUTO_INCREMENT,
  id_filme INT NULL,
  id_usuario INT NULL,

  PRIMARY KEY (`id`),
  
  CONSTRAINT `fk_filme_assistido`
  FOREIGN KEY (`id_filme`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_filme` (`id`),
  CONSTRAINT `fk_usuario_assistido`
  FOREIGN KEY (`id_usuario`)
  REFERENCES `db_acme_filmes_turma_bb`.`tbl_usuario` (`id`)
);


-- -----------------------------------------------------
-- Table `db_acme_filmes_turma_bb`.`tbl_adm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_acme_filmes_turma_bb`.`tbl_adm` (
  id INT NOT NULL AUTO_INCREMENT,
  usuario VARCHAR(45) NOT NULL,
  nome VARCHAR(45) NULL,
  senha VARCHAR(30) NOT NULL,
  email VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
  );
