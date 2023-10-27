import axios from "axios";
import { useState } from "react";
import {enqueueSnackbar} from "notistack";
import { Subscripcion } from "../pagarMensualidad/subscripcion";
import {Separador} from "../../toolsDev/separacion.js"
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export const ModalRegister=({seeModal, setSeeModal, getApi})=>{
    const [nombre, setNombre]=useState("");
    const [unidades, setUnidades]=useState("");
    const [laboratorio, setLaboratorio]=useState("");
    const [costo, setCosto]=useState("");
    const [distribuidor, setDistribuidor]=useState("");
    const [precio, setPrecio]=useState("");
    const [porcentajeGanancia,setPorcentajeGanancia]=useState(0);
    const [porcentajeIVA, setPorcentajeIVA]=useState(0);
    const [ganancia, setGanancia]=useState(0);
    const [subscripcion, setSubscripcion] = useState(false);

    //optener informacion cancelar el furmulario y guardarlo

    const upDateAndDelete=(e)=>{
        const producto={
            idUsuario:1,
            nombre:nombre,
            unidades:unidades,
            laboratorio:laboratorio,
            costo:costo,
            precio:precio,
            distribuidor
        }
        e.preventDefault();
        if(e.target.name == "cancelar"){
            setSeeModal(false);
            //formatear formulario
            setNombre("");
            setLaboratorio("");
            setCosto("");
            setPrecio("");
            setUnidades("");
            setDistribuidor();
        }else{
            
            enviarApi(producto)
        }

       async function enviarApi(producto){
            // eslint-disable-next-line no-undef
          const resultado = await  Electron.invoke("createProducto", producto);
          if (resultado) {
            getApi();
          }
        }

    };

   useEffect(() => {
    const calcularPrecioVenta = () => {
        const costo2 = parseInt(costo);
        const calcularIva = (costo2  * porcentajeIVA) / 100;
        const precioVenta = (costo2 * porcentajeGanancia) / 100 + calcularIva;

        setPrecio(costo2 + precioVenta)
        setGanancia((costo2 + calcularIva) - (costo2 + precioVenta))


    }
    calcularPrecioVenta()
   }, [costo, porcentajeGanancia, porcentajeIVA])
    return(
        <>

<div onClick={(e) => { e.target.className === "modalRegister" && setSeeModal(false) }} className={ "modalRegister"}>
<div className="formularioProducts">
  <h2 className="form-title">REGISTRAR PRODUCTO</h2>
  <div className="form-control form-group" onSubmit={(e) => e.preventDefault()}>
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label htmlFor="producto">Nombre del producto</label>
          <input
            onChange={(e) => setNombre(e.target.value)}
            className="form-control form-control-sm"
            name="producto"
            id="producto"
            type="text"
            value={nombre}
          />
        </div>
        <div className="form-group">
          <label htmlFor="un">Unidades</label>
          <input
            onChange={(e) => setUnidades(e.target.value)}
            className="form-control form-control-sm"
            name="un"
            id="un"
            type="number"
            value={unidades}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label htmlFor="laboratorio">Laboratorio</label>
          <input
            onChange={(e) => setLaboratorio(e.target.value)}
            className="form-control form-control-sm"
            name="laboratorio"
            id="laboratorio"
            type="text"
            value={laboratorio}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="iva">Porcentaje de IVA (%)</label>
          <input
            onChange={(e) => setPorcentajeIVA(e.target.value)}
            className="form-control form-control-sm"
            name="iva"
            id="iva"
            type="number"
            value={porcentajeIVA}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ganancia">Porcentaje de ganancia (%)</label>
          <input
            onChange={(e) => setPorcentajeGanancia(e.target.value)}
            className="form-control form-control-sm"
            name="ganancia"
            id="ganancia"
            type="number"
            value={porcentajeGanancia}
          />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col">
      <div className="form-group">
          <label htmlFor="costo">Costo</label>
          <input
            onChange={(e) => setCosto(e.target.value)}
            className="form-control form-control-sm"
            name="costo"
            id="costo"
            type="text"
            
          />
        </div>
      <div className="form-group">
          <label htmlFor="distribuidor">distribuidor</label>
          <input
            onChange={(e) => setDistribuidor(e.target.value)}
            className="form-control form-control-sm"
            name="distribuidor"
            id="distribuidor"
            type="text"
            
          />
        </div>
      </div>
      <div className="col">
      <div className="form-group">
          <label htmlFor="precio">Precio de venta</label>
          <input
            className="form-control form-control-sm"
            name="precio"
            id="precio"
            type="text"
            value={precio?Separador(precio): 0}
            disabled
          />
        </div>
      <div className="form-group">
          <label htmlFor="precio">ganancia</label>
          <input
            className="form-control form-control-sm"
            name="precio"
            id="precio"
            type="text"
            value={precio?Separador(ganancia): 0}
            disabled
          />
        </div>
      </div>
    </div>
    <div className="buttonsProducts mt-5 w-100 d-flex gap-2 justify-content-around">
      <button
        name="cancelar"
        onClick={(e) => {upDateAndDelete(e); setSeeModal(false)}}
        className="btn btn-danger btnCancel"
      >
        Cancelar
      </button>
      <button
        name="upDate"
        onClick={(e) => upDateAndDelete(e)}
        className="btn btn-success btnUpdate"
      >
        Guardar
      </button>
    </div>
  </div>
</div>
</div>
     {subscripcion && <Subscripcion setSubscripcion={setSubscripcion} />}

        </>

    );
}; 