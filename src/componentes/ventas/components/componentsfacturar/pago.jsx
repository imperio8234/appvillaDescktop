import { useState } from "react";
import {useContext} from "react";
import {userContext} from "../../context/context";
import { random } from "../../../../toolsDev/random"
import { enqueueSnackbar } from "notistack";
import { Separador } from "../../../../toolsDev/separacion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line react/prop-types
export const Pagar = ({ close, pagarFactura, setEfectivo}) => {
    const {venta, products} = useContext(userContext);
    const [devolucion, setDevolucion] =useState();
    const [valorInput, setValorInput]= useState();
    const cancelaCon= (valor) => {
       let valorAcancelar = valor - venta;
       setValorInput(valor)
       setDevolucion(valorAcancelar);
    }

    const pagar= () => {

      if (valorInput == undefined || devolucion < 0) {
        enqueueSnackbar("el valor no cubre la venta", {variant: "warning"})
      } else {
        const idVenta = random(100,1000)
        const productosVendidos = products;
        for (const i in productosVendidos) {
            productosVendidos[i].idVenta =idVenta
        }
        const ventas = {
            idVenta:idVenta,
            valorTotal:venta,
            pagaCon:valorInput,
            devolucion:devolucion,
            productosVendidos: productosVendidos
        }
        

        Pago(ventas)
        
        
      }

      
    }
    const Pago = async (venta) => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/ventas", {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(venta)
            });

            const resultado = await res.json();
            if(resultado.success){
                pagarFactura(venta);
            }else{
              enqueueSnackbar("error", {variant: "error"})
            }
        } catch (error) {
            enqueueSnackbar("error", {variant:"error"})
            
        }
    }
return (
    <div className="cont-pagar cont-medio  bg-white ">
        <div className="ps-2 pe-2 bg-opacity-10 bg-dark cont-header-medio d-flex justify-content-between w-100 align-items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className={"pointer"} onClick={() => setEfectivo("")} />
                    <span>pagar</span>
                    <span onClick={() =>close(false)} className="fs-1 pointer">&times;</span>
        </div>
        <div className=" pagar-cantidad h-75 d-flex flex-column gap-4 p-3">
           <div className="total-pagar p-2 border-bottom">
              <span>total: {venta? Separador(venta): 0 }</span>
           </div>

            <div className="pagar-texto-cantidad d-flex justify-content-around border-bottom ">
              <span>por pagar</span>
              <span>{venta? Separador(venta): 0 }</span>
            </div>
            <div className="input-cantidad h-25 border-bottom ">
                <label htmlFor="valor" className="form-label">efectivo</label>
                <input onChange={(e) => cancelaCon(e.target.value)} type="text" name="valor" className="form-control form-control-sm" id="valor" />
            </div>
            <div className="devolucion h-25 w-100">
                <div className="villete d-flex justify-content-around border-bottom p-2">
                    <p>paga con </p>
                    <p>{valorInput? Separador(valorInput):0 }</p>
                </div>
                <div className="debuelve d-flex justify-content-around border-bottom p-2">
                    <p>{devolucion < 0?"el cliente debe": "devolucion"}</p>
                    <p>{devolucion? Separador(devolucion):0}</p>
                </div>
            </div>
        </div>

        <div className="cont-facturar d-flex justify-content-around w-100">
            <div className="cancelar-venta btn btn-danger w-25">
                <span>cancelar</span>
            </div>
            <div onClick={() => pagar()}  className="pagar-venta btn btn-success w-25">
                <span>pagar</span>
            </div>
        </div>
    </div>
)
}