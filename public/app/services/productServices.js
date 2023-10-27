const {conexion} = require("../toolsDev/db_config/conexion");

const GetAllproductDB = (id, pagina) => {
  const page = (pagina - 1) * 20;
  return new Promise((resolve, reject) => {
    conexion.all("SELECT * FROM productos WHERE id_usuario =? LIMIT 20 OFFSET ?", [id, page], (err, result) => {
      if (err) {
        reject(err);
      }
      conexion.get("SELECT CEIL(COUNT(*)/ 20) AS paginas FROM productos", (err, pages) => {
        if (err) {
          reject(err);
        } else {
          resolve({ success: true, data: result, paginas: pages[0] });
          
        }
      });
    });
  });
};

const DeleteproductDB = (id) => {
  return new Promise((resolve, reject) => {
    conexion.run("DELETE FROM productos WHERE id_producto=?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const UpdateproductDB = (updateProduct) => {
  const { nombre, costo, precio, laboratorio, unidades, idProduct, distribuidor, idUsuario } = updateProduct;
  return new Promise((resolve, reject) => {
    conexion.run("insert into productos_historial set ? ", [{ nombre, id_usuario: idUsuario, costo, precio, laboratorio, unidades, fecha: new Date().toLocaleDateString(), distribuidor }], (err, resultado) => {
      if (err) {
        reject(err);
      } else {
        conexion.run("UPDATE productos SET nombre =?, unidades =?, precio =?, laboratorio=?, costo=?  WHERE id_producto=?", [nombre, unidades, precio, laboratorio, costo, idProduct], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
};

const CreateproductDB = (customer) => {
  const { nombre, idUsuario, costo, precio, laboratorio, unidades, distribuidor } = customer;
  return new Promise((resolve, reject) => {
    conexion.run("INSERT INTO productos_historial (nombre, id_usuario, costo, precio, laboratorio, unidades, fecha, distribuidor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, idUsuario, costo, precio, laboratorio, unidades, new Date().toLocaleDateString(), distribuidor], (err, resultado) => {
        if (err) {
          reject(err);
        } else {
          conexion.get("SELECT * FROM productos WHERE nombre = ? AND id_usuario = ?", [nombre, idUsuario], (err, result) => {
            if (err) {
              reject(err);
            } else {
              if (result) {
                resolve(false);
              } else {
                conexion.run("INSERT INTO productos (nombre, id_usuario, costo, precio, laboratorio, unidades, distribuidor) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  [nombre, idUsuario, costo, precio, laboratorio, unidades, distribuidor], (err, row) => {
                    if (err) {
                      reject(err.message);
                    } else {
                      resolve(true);
                    }
                  });
              }
            }
          });
        }
      });
  });
};

const findProductDB = (id, words) => {
  return new Promise((resolve, reject) => {
    conexion.run("select * from productos where nombre like ? and id_usuario = ? ", [`%${words}%`, id], (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve({ success: true, data: result });
      }
    });
  });
};
module.exports = {
  GetAllproductDB,
  DeleteproductDB,
  UpdateproductDB,
  CreateproductDB,
  findProductDB
};
