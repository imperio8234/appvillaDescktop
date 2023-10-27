CREATE TABLE IF NOT EXISTS administrador(
    id_usuario INTEGER PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
    correo VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    celular VARCHAR(250) NOT NULL,
    contraseña VARCHAR(250) NOT NULL,
    activo BOOLEAN DEFAULT FALSE,
    fecha VARCHAR(500),
    clave INT
);

CREATE TABLE IF NOT EXISTS productos(
    id_producto INTEGER PRIMARY KEY,
    unidades INT NOT NULL,
    distribuidor VARCHAR(400),
    nombre VARCHAR(250) NOT NULL,
    costo INT NOT NULL,
    precio INT NOT NULL,
    laboratorio VARCHAR(250),
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES administrador(id_usuario)  
);

CREATE TABLE IF NOT EXISTS productos_historial(
    id_producto INTEGER PRIMARY KEY,
    unidades INT NOT NULL,
    distribuidor VARCHAR(400),
    nombre VARCHAR(250) NOT NULL,
    costo INT NOT NULL,
    precio INT NOT NULL,
    laboratorio VARCHAR(250),
    id_usuario INT NOT NULL,
    fecha VARCHAR(500),
    FOREIGN KEY (id_usuario) REFERENCES administrador(id_usuario)  
);

CREATE TABLE IF NOT EXISTS deudas(
    id_deuda INTEGER PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre VARCHAR(250) NOT NULL,
    celular VARCHAR(250) NOT NULL,
    valor INT NOT NULL,
    fecha VARCHAR(250) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES administrador(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS abonos(
    id_abono INTEGER PRIMARY KEY,
    id_deuda INT NOT NULL,
    fecha VARCHAR(250) NOT NULL,
    valor INT NOT NULL,
    CONSTRAINT fk_deudas FOREIGN KEY (id_deuda) REFERENCES deudas(id_deuda)
);

CREATE TABLE IF NOT EXISTS suma_deuda(
    id_suma INTEGER PRIMARY KEY,
    id_deuda INT NOT NULL,
    fecha VARCHAR(250) NOT NULL,
    producto VARCHAR(250) NOT NULL,
    valor INT NOT NULL,
    CONSTRAINT fk_deuda FOREIGN KEY (id_deuda) REFERENCES deudas(id_deuda)
);

CREATE TABLE IF NOT EXISTS creditos(
    id_credito INTEGER PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre VARCHAR(250) NOT NULL, 
    celular VARCHAR(250) NOT NULL,  
    fecha VARCHAR(250) NOT NULL,
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES administrador(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS abonos_credito(
    id_abono INTEGER PRIMARY KEY,
    id_credito INT NOT NULL,
    fecha VARCHAR(250) NOT NULL,
    valor INT NOT NULL,
    CONSTRAINT fk_credito FOREIGN KEY (id_credito) REFERENCES creditos(id_credito)
);

CREATE TABLE IF NOT EXISTS suma_credito(
    id_suma INTEGER PRIMARY KEY,
    id_credito INT NOT NULL,
    fecha VARCHAR(250) NOT NULL,
    producto VARCHAR(250) NOT NULL,
    valor INT NOT NULL,
    unidades INT,
    precio INT,
    laboratorio VARCHAR(500),
    id_venta int,
    id_usuario int,
    id_producto int,
    CONSTRAINT fk_creditoSuma FOREIGN KEY (id_credito) REFERENCES creditos(id_credito)
);

-- Resto del código sin cambios


--- tabla de lista -------

CREATE table IF NOT EXISTS lista (
    id_usuario INT NOT NULL,
    id_producto INT,
    nombre VARCHAR(400),
    unidades INT,
    precio INT,
    valor_total INT,
    laboratorio VARCHAR(500),
    PRIMARY KEY (id_producto),
    CONSTRAINT fk_lista
    FOREIGN KEY (id_usuario)
    REFERENCES administrador(id_usuario)
);