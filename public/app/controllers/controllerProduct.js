const { unstable_renderSubtreeIntoContainer } = require("react-dom");
const { GetAllproductDB, DeleteproductDB, UpdateproductDB, CreateproductDB, findProductDB } = require("../services/productServices");
const isNumber = require("../toolsDev/isNumber");
const getAllproducts = async (req, res) => {
  const id = 1;
  const pagina = 1;
 const getProducts= await GetAllproductDB(id, pagina)
    .then(data => {
      if (data.length <= 0) {
       return {
          success: false,
          message: "no hay productos registrados"
        }
      } else {
        return {
          success: true,
          message: "productos registrados",
          data
        }
      }
    })
    .catch(err => {
      return {
        err
      }
    });

    return getProducts;
};

const createProducts = async (productos) => {
  const idUsuario = 1;
  const { nombre, unidades, costo, precio, laboratorio, distribuidor} = productos;
  const product = {
    nombre,
    unidades,
    costo,
    precio,
    laboratorio,
    idUsuario,
    distribuidor
  };
  if (!isNumber(unidades) || !isNumber(costo) || !isNumber(precio)) {
    return {
      success: false,
      message: "hay datos erroneos"
    }
  } else if (laboratorio && nombre && distribuidor) {
   const respuesta = await CreateproductDB(product)
      .then(result => {
        if (result) {
          console.log("exito")
          return {
            success: true,
            message: "registro exitoso"
          };
        } else {
          console.log("ya esta registrado")
          return {
            success: false,
            message: "producto en el inventario"
          }
        }
      }).catch(err => {
        console.log("error", err)
        return {
          err
        }
      });
      return respuesta.success? {success: true, message: "exito al guardar"}: {success: false, message: respuesta.err}
  } else {
    return {
      success: false,
      message: "faltan campos por llenar "
    }
  }
};

const deleteProducts = (req, res) => {
  const id = req.params.idproduct;
  DeleteproductDB(id)
    .then(result => {
      res.json({
        message: "se elimino correctamente",
        success: true,
        result
      });
    })
    .catch(err => {
      res.json({
        message: err
      });
    });
};

const updateProducts = (req, res) => {
  const idUsuario = req.usuario.id_usuario;
  const { nombre, unidades, costo, precio, laboratorio, idProduct, distribuidor } = req.body;
  const product = {
    nombre,
    unidades,
    costo,
    precio,
    laboratorio,
    idProduct,
    distribuidor,
    idUsuario
  };

  if (!isNumber(precio) || !isNumber(costo) || !isNumber(unidades)) {
    res.json({
      success: false,
      message: "no deben de existir letras en algunos campos"
    });
  } else {
    UpdateproductDB(product)
      .then(result => {
        if (result) {
          res.json({
            success: true,
            message: "se actualizo correctamente"
          });
        }
      })
      .catch(err => {
        if (err) {
          res.json({
            success: false,
            message: "error al acceder"
          });
        }
      });
  }
};

const findProduct = (req, res) => {
  const id = req.usuario.id_usuario;
  const words = req.params.words;

  findProductDB(id, words)
    .then(result => {
      if (result.data.length <= 0) {
        res.json({
          message: "no se encontro ningun registro",
          success: false
        });
      } else {
        res.json({
          success: true,
          data: result.data
        });
      };
    })
    .catch(err => {
      if (err) {
        res.json({
          success: false,
          message: "ocurrio un error",
          err
        });
      }
    });
};

module.exports = {
  getAllproducts,
  deleteProducts,
  updateProducts,
  createProducts,
  findProduct
};
