import { useState } from "react"
import { CreditoCliente } from "./componentsfacturar/creditoCliente";
import { MedioPago } from "./componentsfacturar/medioDePago";
import { Pagar } from "./componentsfacturar/pago";


// eslint-disable-next-line react/prop-types
export const Pago = ({setFacturar, setFacturado, setVentaRealizada, cancelarVenta}) => {
    const [efectivo, setEfectivo] = useState("");
   // const [closeFactu, setCloseFactu] = useState();
    const close= (cerrar) => {
        setFacturar(cerrar)
    }

    const pagarFactura = (venta) => {
        setFacturado(true);
        setFacturar(false)
        setVentaRealizada(venta)
        cancelarVenta();
    }
    const borrar =() => {
        cancelarVenta()
    }

    const ContentRender = () => {
       if (efectivo == "") {
         return <MedioPago close={close} setEfectivo={setEfectivo} />
       } else if (efectivo == "efectivo"){
         return <Pagar pagarFactura={pagarFactura} close={close} setEfectivo={setEfectivo} />
       } else if (efectivo == "credito") {
         return <CreditoCliente borrar={borrar} setEfectivo={setEfectivo}  close={close} pagarFactura={pagarFactura}/>
       }
    }
    
    return (
        <div className="cont-pago">
            { ContentRender() }          
        </div>
    )
}