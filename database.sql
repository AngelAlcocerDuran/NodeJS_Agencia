CREATE DATABASE agencia;
--USE agencia;

CREATE TABLE marca(
	id int AUTO_INCREMENT NOT NULL,
    nombre varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE autos(
	id bigint AUTO_INCREMENT NOT NULL,
    nombre varchar(100) NOT NULL,
    matricula varchar(7) NOT NULL,
    adv char(4) NOT NULL,
    registered date,
    updated date,
    estado tinyint DEFAULT 1,
    marca int REFERENCES marca(id),
    PRIMARY KEY (id),
    UNIQUE KEY (matricula)
);