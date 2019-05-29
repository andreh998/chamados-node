CREATE TABLE IF NOT EXISTS departamentos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
	descricao VARCHAR(255)
);

INSERT INTO departamentos(nome, descricao) VALUES ('TI', 'Departamento de Tecnologia da Informação');

CREATE TABLE IF NOT EXISTS perfis(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    ativo CHAR(1) NOT NULL
);

INSERT INTO perfis(nome, descricao, ativo) VALUES ('Admin', 'Administrador do Sistema', 'S');

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
	data_ultima_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO usuarios (id_perfil, id_depto, nome, cpf, email, login, senha, ativo) VALUES 
	(1, 1, 'André Hoffmann', '08535831967', 'andreh998@gmail.com', 'andre', 'andre@123', 'S');

ALTER TABLE usuarios ADD CONSTRAINT fk_usuario_perfil FOREIGN KEY (id_perfil) REFERENCES perfis (id) ON DELETE CASCADE;
ALTER TABLE usuarios ADD CONSTRAINT fk_usuario_departamento FOREIGN KEY (id_depto) REFERENCES departamentos (id) ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS assuntos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_depto INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL
);

ALTER TABLE assuntos ADD CONSTRAINT fk_assunto_departamento FOREIGN KEY (id_depto) REFERENCES departamentos (id) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS status(
    id INT PRIMARY KEY AUTO_INCREMENT,    
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS prioridades(
    id INT PRIMARY KEY AUTO_INCREMENT,    
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS chamados(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario_abertura INT NOT NULL,
    id_depto_atribuido INT NOT NULL,
    id_usuario_atribuido INT NOT NULL,
    id_assunto INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    id_status INT NOT NULL,
    id_prioridade INT NOT NULL,
    descricao_problema TEXT NOT NULL,
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_interacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	data_encerramento TIMESTAMP    
);

ALTER TABLE chamados ADD CONSTRAINT fk_chamado_status FOREIGN KEY (id_status) REFERENCES status (id) ON DELETE CASCADE;
ALTER TABLE chamados ADD CONSTRAINT fk_chamado_prioridade FOREIGN KEY (id_prioridade) REFERENCES prioridades (id) ON DELETE CASCADE;
ALTER TABLE chamados ADD CONSTRAINT fk_chamado_usuario_abertura FOREIGN KEY (id_usuario_abertura) REFERENCES usuarios (id) ON DELETE CASCADE;
ALTER TABLE chamados ADD CONSTRAINT fk_chamado_depto_atribuido FOREIGN KEY (id_depto_atribuido) REFERENCES departamentos (id) ON DELETE CASCADE;
ALTER TABLE chamados ADD CONSTRAINT fk_chamado_usuario_atribuido FOREIGN KEY (id_usuario_atribuido) REFERENCES usuarios (id) ON DELETE CASCADE;
ALTER TABLE chamados ADD CONSTRAINT fk_chamado_assunto FOREIGN KEY (id_assunto) REFERENCES assuntos (id) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS anexos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_chamado INT NOT NULL,
    nome_arquivo VARCHAR(255) NOT NULL,
    caminho_arquivo VARCHAR(255) NOT NULL
);

ALTER TABLE anexos ADD CONSTRAINT fk_anexos_chamados FOREIGN KEY (id_chamado) REFERENCES chamados (id) ON DELETE CASCADE;

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