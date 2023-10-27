import { useState } from "react"
import {enqueueSnackbar} from "notistack"


import {Search} from "./componentSearch/browser.jsx"
import { CardVenta } from "./componentSearch/cardSearch.jsx";
// eslint-disable-next-line react/prop-types
export const ProductosVenta = ({getProducts, windowWidth}) => {
    const [Data, setData] = useState([]);

    
    const agregar = (item, unidades) => {      
        const producto = item;
        producto.unidades = unidades;
        producto.valorTotal=valorTotal(producto.precio, unidades)
        delete producto.costo
       postApiItem(producto);
       // reducir en un o la cantidad del producto 
       const newData = Data.map((dataItem) => {
        if (dataItem.id === producto.id) {
          return {
            ...dataItem,
            unidades: dataItem.unidades - 1
          };
        }
        return dataItem;
      });
      setData(newData)

        
    }
    
    const valorTotal= (valor, uni) => {
        return parseInt(valor) * uni
    }
    const postApiItem = async (item) =>{
        try {
            const res = await fetch("http://localhost:2000/api/v1/lista", {
                method:"POST",
                headers:{
                    "content-type":"application/json" 
                },
                credentials: "include",
                body:JSON.stringify(item)
            })
            const resultado = await res.json();
            if (resultado.success) {
                getProducts();
            }else {
                enqueueSnackbar(resultado.message, {variant: "info"})
            }
        } catch (error) {
            if (error) {
                console.log(error)
            }
            
        }
    }
    return (
        <div className={windowWidth <= 700?"cont-ventasAdd p-2 gap-2 w-100":"cont-ventasAdd p-2 gap-2 w-50" }>
            <div className="buscadorVenta p-2">
                <Search setData={setData} agregar={agregar}/>
            </div>
            <div className="ventaEncontrada p-2">
                <div className=" container w-100 h-75 gap-4 d-flex scrollstyle flex-wrap ">
                    {
                        Data.map((item, index) => {
                            return (
                                <CardVenta key={index} precio={item.precio} producto={item.nombre} item={item} agregar={agregar}/>
                            )
                        })
                    }
                  
                   {/* <table>
                        <tbody>
                            
                                Data.map((item, index) => {                                   
                                    return (
                                        <tr className="h-25" key={index}>
                                          <td>{item.unidades}</td>
                                          <td>{item.nombre}</td>
                                          <td>{item.precio}</td>
                                          <td className={item.unidades == 0?" add-list bg-secondary":"pointer add-list"} onClick={()=>item.unidades <= 0? "":agregar({...item}, 1)}>agregar</td>
                                        </tr>
                                    )
                                })
                            
                        </tbody>
                            </table>*/}
                </div>

            </div>
        </div>
    )
}