import { enqueueSnackbar } from "notistack";
import { useState } from "react"
import { useEffect } from "react"
import { Separador } from "../../../toolsDev/separacion";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrashCan} from "@fortawesome/free-regular-svg-icons"

// eslint-disable-next-line react/prop-types
export const ListaVentas = ({getProducts, products, setProducts}) => {
   // const {products} = useContext(userContext);    
    const [productos, setProductos] = useState([]);
    useEffect(() => {
       setProductos(products) 
    }, [products])
    const deleteItem = async (idProducto) => {
        try {
            fetch(`http://localhost:2000/api/v1/lista/${idProducto}`, {
                method: "DELETE",
                headers:{
                    "content-type": "application/json"
                },
                credentials: "include",
            })
            .then(result => {
                if (result) {
                    getProducts()
                    if(productos.length <= 1){
                        setProducts([]);
                        setProductos([])
                    }
                }
            })
            
        } catch (error) {
            enqueueSnackbar("hay un error ", {variant: "warning"});
            console.log(error)
        }


    }
    const editItem = async (unidades, precio,id_producto ) => {
      if (unidades <= 0) {
            deleteItem(id_producto);
        }
        let valorTotal = unidades * precio;
        
        const producto = {
            id_producto,
            unidades,
            valorTotal
        }

        try {
            const res= await fetch("http://localhost:2000/api/v1/lista", {
                method: "PUT",
                credentials:"include",
                headers:{
                    "content-type": "application/json"
                },
                
                body: JSON.stringify(producto)
            })
            const resultado = await res.json();
            if (resultado.success) {
                getProducts();
            } else {
                getProducts();
            }
        } catch (error) {
            if (error) {
                enqueueSnackbar("error", {variant:"warning"})
            }
        }
        
    }
    return (
        <div className="cont-list scrollstyle p-3">

            <div className="cont-table-list">
                <table className="table">
                    <tbody>
                        {
                           !productos.length <= 0? productos.map((item, index) => {
                             // Definir variables
                             let contador = !item.unidades? 1: item.unidades;

                             // Función para incrementar el contador
                             function incrementarContador(e, id, index) {
                                contador++;
                                contadorInit(e, id, index);
                               
                             }
                             
                             // Función para reiniciar el contador
                             function reiniciarContador(e, id, index) {
                               contador --;
                               
                               contadorInit(e, id, index)
                             }
                             function contadorInit(e, id, index) {
                               document.getElementById(id).textContent = item.unidades;
                               document.getElementById(index).textContent = contador * item.precio;
                             }
                           
                                return (
                                    <tr className="fs-6" key={item.id_producto}>
                                      <td className="d-flex justify-content-center w-100">
                                        <div className="cont-unidades-suma w-100 d-flex gap-3">
                                          <div onClick={(e)=>{reiniciarContador(e, item.id_producto, index); editItem(contador, item.precio, item.id_producto, item.id_usuario)} } className="restar-uni ">
                                             <span>&minus;</span>
                                          </div>
                                          <div className="contador ">
                                            <span id={item.id_producto}>{item.unidades}</span>
                                          </div>
                                          <div onClick={(e) => {incrementarContador(e, item.id_producto, index); editItem(contador, item.precio, item.id_producto, item.id_usuario)}} className="sumar-uni">
                                              <span>&#43;</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td>{item.nombre}</td>
                                      <td>{ item.precio?Separador(item.precio):0}</td>
                                      <td id={index}>{item.valor_total?Separador(item.valor_total):0}</td>
                                      <td className=" w-25"><div className="w-100 d-flex justify-content-around">
                                           <div onClick={() => deleteItem(item.id_producto, item.id_usuario)} className="im2 pointer">
                                           <FontAwesomeIcon icon={faTrashCan} className=" fs-4" />                                           </div>
                                          </div>
                                       </td>
                                    </tr> 
                                )
                            })
                        :<tr><td colSpan={5} className="text-center">no hay productos en la lista</td></tr>}                     
                    </tbody>
                </table>
            </div>

        </div>
    )
}