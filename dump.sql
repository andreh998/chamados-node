CREATE TABLE IF NOT EXISTS departamentos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
	descricao VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS perfis(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    ativo CHAR(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_perfil INT NOT NULL,
    id_depto INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    ativo CHAR(1) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	data_ultima_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    data_exclusao TIMESTAMP
);

ALTER TABLE usuarios ADD CONSTRAINT fk_usuario_perfil FOREIGN KEY (id_perfil) REFERENCES perfis (id) ON DELETE CASCADE;
ALTER TABLE usuarios ADD CONSTRAINT fk_usuario_departamento FOREIGN KEY (id_depto) REFERENCES departamentos (id) ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS assuntos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_depto INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL
);

ALTER TABLE assuntos ADD CONSTRAINT fk_assunto_departamento FOREIGN KEY (id_depto) REFERENCES departamentos (id) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS chamados(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario_abertura INT NOT NULL,
    id_depto_atribuido INT NOT NULL,
    id_usuario_atribuido INT NOT NULL,
    id_assunto INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    prioridade VARCHAR(255) NOT NULL,
    descricao_problema TEXT NOT NULL,
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_interacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	data_encerramento TIMESTAMP    
);

ALTER TABLE chamados ADD CONSTRAINT fk_chamado_usuario_abertura FOREIGN KEY (id_usuario_abertura) REFERENCES usuarios (id) ON DELETE CASCADE;
ALTER TABLE chamados ADD CONSTRAINT fk_chamado_depto_atribuido FOREIGN KEY (id_depto_atribuido) REFERENCES departamentos (id) ON DELETE CASCADE;
ALTER TABLE chamados ADD CONSTRAINT fk_chamado_usuario_atribuido FOREIGN KEY (id_usuario_atribuido) REFERENCES usuarios (id) ON DELETE CASCADE;
ALTER TABLE chamados ADD CONSTRAINT fk_chamado_assunto FOREIGN KEY (id_assunto) REFERENCES assuntos (id) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS interacoes(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_chamado INT NOT NULL,
    id_usuario_interacao INT NOT NULL,
    interacao TEXT NOT NULL,
    data_interacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE interacoes ADD CONSTRAINT fk_interacao_chamado FOREIGN KEY (id_chamado) REFERENCES chamados (id) ON DELETE CASCADE;
ALTER TABLE interacoes ADD CONSTRAINT fk_usuario_interacao FOREIGN KEY (id_usuario_interacao) REFERENCES usuarios (id) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS classificacoes(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_chamado INT NOT NULL,
    id_usuario_feedback INT NOT NULL,
    nota CHAR NOT NULL,
    feedback VARCHAR(255)
);

ALTER TABLE classificacoes ADD CONSTRAINT fk_classificacao_chamado FOREIGN KEY (id_chamado) REFERENCES chamados (id) ON DELETE CASCADE;
ALTER TABLE classificacoes ADD CONSTRAINT fk_classificacao_usuario FOREIGN KEY (id_usuario_feedback) REFERENCES usuarios (id) ON DELETE CASCADE;