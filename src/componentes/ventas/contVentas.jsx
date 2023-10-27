import { enqueueSnackbar, SnackbarProvider } from "notistack"
import { useEffect } from "react"
import { useState } from "react"
import "../../css/home/ventas.css"
import { Subscripcion } from "../pagarMensualidad/subscripcion"
import { Barra } from "./components/barraTotal"
import { ProductosVenta } from "./components/busquedaProducto"
import { ListaVentas } from "./components/listaVenta"
import { Panel } from "./components/panel"
import {userContext} from "./context/context"
export const Ventas = () => {
    const [products, setProducts] = useState([]);
    const [venta, setVenta] = useState();
    const [subscripcion, setSubscripcion] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };  
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    useEffect(() =>{
        getProducts()
    },[])
    useEffect(() => {
  suma();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])
    const  suma = () => {
        let valores = [];
        for (const i in products) {
            valores.push(products[i].valor_total)
        }
        const valorVentas = valores.reduce((a,b) =>a + b, 0)
        setVenta(valorVentas)
    }
    const getProducts = async () => {
       
    }
    const obj={
        products,
        venta
    }

    return (
      <SnackbarProvider>
         <userContext.Provider value={obj}>
         <div className={windowWidth <= 700 ?"contentProductos d-flex flex-column":"contentProductos d-flex" }>
            <ProductosVenta windowWidth={windowWidth} getProducts={getProducts} products={products} setProducts={setProducts} />
             <div className={windowWidth <= 700?"w-100 h-50":"w-50"}>
             <ListaVentas getProducts={getProducts} products={products} setProducts={setProducts} />
             <Barra venta={venta} />
             <Panel setProducts={setProducts} getProducts={getProducts} products={products} venta={venta} />
             </div>
            {subscripcion && <Subscripcion setSubscripcion={setSubscripcion} />}
        </div>
       </userContext.Provider>
      </SnackbarProvider>
    )

}