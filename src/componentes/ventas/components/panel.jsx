import { enqueueSnackbar } from "notistack";
import { useState } from "react"
import { Factura } from "./componentsfacturar/facturaPago";
import {PDFViewer, PDFDownloadLink} from "@react-pdf/renderer"
import { Pago } from "./pagoFactura";
import { Separador } from "../../../toolsDev/separacion";

// eslint-disable-next-line react/prop-types
export const Panel = ({getProducts, setProducts, venta}) => {
    const [facturar, setFacturar] = useState(false);
    const [facturado, setFacturado] = useState(false);
    const [ventaRealizada, setVentaRealizada] = useState([]);
    
    const Vender = () => {
        setFacturar(true);
    }

      const cancelarVenta = async () => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/lista/all",{
                method:"DELETE",
                headers:{
                    "content-type": "application/json"
                },
                credentials:"include"
            })
            const result = await res.json();
            if (result) {
                enqueueSnackbar("venta finalizada", {variant: "success"});
                getProducts();
                setProducts([])
            } 
            
        } catch (error) {
            console.log(error, "error")
        }
    }
    return (
        <div className="cont-panel">
            <div className="actions-venta d-flex justify-content-center align-items-center gap-3 p-3 flex-column">
                <div onClick={() => !venta <= 0 && Vender()} className={!venta <= 0?"vender btn btn-success btn-sm w-100 h-50 fs-6 d-flex justify-content-between align-items-center":"vender btn btn-secondary btn-sm w-100 h-50 fs-6 d-flex justify-content-between align-items-center pe-none"}>
                    <span>vender</span>
                    <span>{venta? Separador(venta): 0 }</span>
                </div>
                <div className="devolucion btn btn-primary btn-sm w-100 h-50 fs-6  text-start">
                    <span>devoluciones</span>
                </div>
                <div onClick={()=> !venta <= 0 && cancelarVenta()} className={!venta <= 0 ? "btn btn-danger btn-sm text-start w-100 h-50 fs-6 ":"btn btn-secondary btn-sm text-start w-100 h-50 fs-6 pe-none"}>
                    <span>cancelar venta</span>
                    
                </div>
                {facturar && <Pago cancelarVenta={cancelarVenta} setVentaRealizada={setVentaRealizada} setFacturado={setFacturado}  setFacturar={setFacturar}/>}
                {facturado && (<div className="overf">
                    <div className="botones d-flex flex-column gap-3 m-3">
                    <div onClick={()=> setFacturado(false)} className="btn btn-success">
                        <span>cerrar</span>
                    </div>

                    <PDFDownloadLink document={<Factura setFacturado={setFacturado} ventaRealizada={ventaRealizada} />} fileName="factura">
                   <div onClick={()=> {enqueueSnackbar("se creo una factura puedes enviarla", {variant:"success"})}} className="btn btn-primary">
                        <span>guardar factura</span>
                    </div>
                   </PDFDownloadLink>
                    </div>

                    <PDFViewer style={{width:"50%", height:"75%"}}><Factura setFacturado={setFacturado} ventaRealizada={ventaRealizada} /></PDFViewer>
                              </div>)}

            </div>
        </div>
    )
}