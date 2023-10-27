import { useState } from "react";
import {useContext} from "react";
import {userContext} from "../../context/context";
import { random } from "../../../../toolsDev/random"
import { enqueueSnackbar } from "notistack";
import { Separador } from "../../../../toolsDev/separacion";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
export const CreditoCliente = ({close, borrar, setEfectivo}) => {
    const {venta, products} = useContext(userContext);
    const [data, setData] =useState([]);
    const [valorInput, setValorInput]= useState("");
    const [idCredito, setIdCredito] = useState("");

    const cliente= async (valor) => {
        
      // setIdCredito(id == undefined ?"":id[0].id_credito)
       setValorInput(valor)
       /// buscar 
       try {
        const res = await fetch(`http://localhost:2000/api/v1/creditos/find/${valor}`, {
            method:"GET",
            credentials:"include",
            headers:{
                "content-type":"application/json"                
            }
        })
        const result = await res.json();
        if (result.success) {
            setData(result.data)
            setIdCredito(result.data[0].id_credito);

        }
       } catch (error) {
        if( error){
            enqueueSnackbar(error.message,{variant: "error"})
        }
        
       }
    }

    const pagar= () => {

      if (valorInput == undefined) {
        enqueueSnackbar("el valor no cubre la venta", {variant: "warning"})
      } else {
        const idVenta = random(100, 1000);
        const productosVendidos = products;
        for (const i in productosVendidos) {
            productosVendidos[i].idCredito =idCredito;
            productosVendidos[i].idVenta =idVenta;
            productosVendidos[i].fecha =new Date().toLocaleDateString();
        }
        const ventas = {
            productosVendidos: productosVendidos
        }
        
        Pago(ventas)
        
        
      }

      
    }
    const Pago = async (venta) => {
        try {
            const res = await fetch("http://localhost:2000/api/v1/addcredit-record", {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(venta)
            });

            const resultado = await res.json();
            if(resultado.success){
                //pagarFactura(venta);
                close(false)
                borrar();
                Swal.fire({
                    title: "su credito se a guardado con exito",
                    icon:"success"
                })
                
            }else{
              enqueueSnackbar("error", {variant: "error"})
              
            }
        } catch (error) {
            enqueueSnackbar("error", {variant:"error"})
            console.log(error)
            
        }
    }
    return (
        <div className="cont-pagar cont-medio  card ">
        <div className="ps-2 pe-2 bg-opacity-10 bg-dark cont-header-medio d-flex justify-content-between w-100 align-items-center">
                    <FontAwesomeIcon className="pointer" onClick={() => setEfectivo("")} icon={faArrowLeft}/>
                    <span>guardar credito</span>
                    <span onClick={() =>close()} className="fs-1 pointer">&times;</span>
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
                <label htmlFor="valor" className="form-label">cliente</label>
                <input onChange={(e) => { cliente(e.target.value)}} className="form-control" list="cliente"  name="cliente"/>
                <datalist id="cliente">
                    {
                      data.map((e, index) => {
                        console.log(e)
                        return (
                            <option onClick={() => setIdCredito(e.id_credito)} key={index} value={e.nombre}>{e.nombre}</option>
                            
                        )
                      })
                    }

                </datalist>
                
            </div> 
            <div className="devolucion h-25 w-100">
                <div className="villete d-flex justify-content-around border-bottom p-2">
                    <p>nombre del cliente  </p>
                    <p>{valorInput}</p>
                </div>
                <div className="debuelve d-flex justify-content-around border-bottom p-2">
                    <p>valor del credito</p>
                    <p>{venta? Separador(venta): 0 }</p>
                </div>
            </div>
        </div>

        <div className="cont-facturar d-flex justify-content-around w-100  p-3 gap-3">
            <div className="cancelar-venta btn btn-danger w-50">
                <span>cancelar</span>
            </div>
            <div onClick={() => pagar()}  className="pagar-venta btn btn-success w-50">
                <span>guardar</span>
            </div>
        </div>
    </div>
    )
}