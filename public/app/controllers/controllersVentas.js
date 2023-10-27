const { crearVentaDB, getVentasDB, getProductosDB, buscarProductoDB, getAllVentasDB, getGraficosDB } = require("../services/ventasServices");

const crearVenta = (produt) => {
  const idUsuario = 1;
  const { idVenta, valorTotal, productosVendidos, pagaCon, devolucion } = produt;

  const venta = {
    idUsuario,
    idVenta,
    pagaCon,
    devolucion,
    valorTotal,
    fecha: new Date().toLocaleDateString()
  };
  crearVentaDB(venta, productosVendidos)
    .then(result => {
      if (result.success) {
        return {
          message: "venta exitosa",
          success: true
        }
      }
    })
    .catch(err => {
      return {
        message: err.message,
        success: false
      }
    });
};

const getVentas = (req, res) => {
  const id = 1;
  const pagina = 1;
  const fecha = req.params.fecha.split(",");
  const sinCero = parseInt(fecha[1], 10).toString();
  fecha.splice(1, 0, sinCero);
  const nuevo = [...fecha];
  nuevo.splice(2, 1);
  getVentasDB(id, pagina, nuevo.join("/"))
    .then(result => {
      if (result.success) {
        const total = [].concat(...result.venta.map(valor => valor.total_venta));
        const ventas = total.reduce((a, b) => a + b, 0);
        return {
          data: result.venta,
          valorVentas: ventas,
          success: true,
          page: result.paginas
        }
      } else {
        return{
          message: "sin registros",
          success: false
        }
      }
    })
    .catch(err => {
      return {
        err,
        success: false
      }
    });
};
const getAllVentas = (req, res) => {
  const id = parseInt(req.usuario.id_usuario);
  const pagina = req.params.page;

  getAllVentasDB(id, pagina)
    .then(result => {
      if (result.success) {
        const fechas = [].concat(...result.ventas.map(fecha => fecha.fecha));
        const fechas2 = [...new Set(fechas)];

        return {
          data: fechas2,
          success: true,
          page: result.paginas
        }
      } else {
        return {
          message: "sin registros",
          success: false
        }
      }
    })
    .catch(err => {
      return {
        err,
        success: false
      }
    });
};

const getProductosVentas = (req, res) => {
  const idVenta = req.params.idventa;
  getProductosDB(idVenta)
    .then(result => {
      return {
        success: true,
        data: result.result
      }
    })
    .catch(err => {
      return {
        err,
        success: false
      }
    });
};
const getGraficosVentas = (req, res) => {
  const idUsuario = req.usuario.id_usuario;
  getGraficosDB(idUsuario)
    .then(result => {
      // optenemos las fechas solas
      const ventas = result.ventas.map(venta => venta.fecha);
      // eliminamos las fechas repetidas
      const reduce = [...new Set(ventas)];
      // reducimos solo al mes y año quitamos los dias
      const mesAño = reduce.map(fecha => fecha.split("/").splice(1, 2).join("/"));

      // eliminamos los años y meces repetidos
      const mesAñoReduce = [...new Set(mesAño)].sort((a, b) => parseInt(a.split("/")[0]) - parseInt(b.split("/")[0]));
      // meses
      const nombresDeMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

      // agrupar los valores con las fechas reducidas

      const totales = reduce.map(fecha => {
        const find = result.ventas.filter(item => item.fecha === fecha);
        const totalVenta = find.map(item => item.total_venta);
        const totalVentas = totalVenta.reduce((a, b) => a + b, 0);

        return {
          fecha,
          valores: totalVentas
        };
      });

      // agrupamos el mes y año con sus respectivos dias y valores del dia transcurrido
      const resultado = mesAñoReduce.map(item => {
        const find = totales.filter(item2 => item2.fecha.split("/").splice(1, 2).join("/") === item);
        // quitamos años y meses dejamos dias
        const fechaValor = find.map(fV => {
          return {
            dia: fV.fecha.split("/")[0],
            valor: fV.valores
          };
        });

        return {
          mes: nombresDeMeses[parseInt(item.split("/").splice(0, 1)[0]) - 1],
          dias: fechaValor.sort((a, b) => parseInt(a.dia) - parseInt(b.dia))
        };
      });
      return {
        success: true,
        data: resultado
      }
    })
    .catch(err => {
      return {
        err,
        success: false
      }
    });
};
const buscarProducto = (name) => {
  const nombreProducto = name;
  const idUsuario = 1;
 return buscarProductoDB(nombreProducto, idUsuario)
    .then(result => {
      if (result) {
        return {
          data: result,
          success: true
        }
      } else {
        return {
          message: "no se encontro el producto",
          success: false
        }
      }
    })
    .catch(err => {
      if (err) {
        return {
          message: "error",
          success: false,
          err
        }
      }
    });
};
// const eliminarVenta = () => {
//
// };
module.exports = {
  crearVenta,
  getVentas,
  getProductosVentas,
  buscarProducto,
  getAllVentas,
  getGraficosVentas
};
