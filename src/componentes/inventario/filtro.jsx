import { enqueueSnackbar } from "notistack";
import { useState } from "react";

//eslint-disable-next-line react/prop-types
export const Filtro=({filtro, filtrarProduct})=>{

    const [cantidad, setCantidad]=useState("");
    const [valor, setValor]=useState("");

                // variables para 
        
      const CheckPrecio=document.getElementById("checkPrecio");
      const checkCantidad=document.getElementById("checkCantidad");
     
           // funcion para filtrar lo que se necesita
    function filtrarCantidad(){
       
        if (CheckPrecio.checked && valor) {
           const porValor={
            precio:valor,
            modo:"valor"
           };
           filtrarProduct(porValor);
            
        }else if(checkCantidad.checked && cantidad){
            const porCantidad={
                cantidad:cantidad,
                modo:"cantidad"
               };
               filtrarProduct(porCantidad);
        }else{
            enqueueSnackbar("elige algun filtro", {variant:"error"})
        }
        
        
        
    }

    return(
        <>
          <div className={filtro?"menuFiltrar":"menuFiltrar esconderMenuFiltrar"}>
                        <div className="tipoDeFiltro">
                            <div className="precioFiltro">
                                
                                <input onChange={()=>CheckPrecio.checked? checkCantidad.checked = false:""} className="form-check-input" type="checkbox" role="switch" id="checkPrecio"/>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                              
                                <label  htmlFor="precio">precio de 0 a
                                    <select onClick={(e)=>setValor(e.target.value)} name="precio" id="precio">
                                       <option  value=""></option>
                                       <option  value="2000">2.000</option>
                                       <option value="5000">5.000</option>
                                       <option value="1000">1.000</option>
                                       <option value="15000">15.000</option>
                                     </select>
                                 </label>
                            </div>
                            <div className="cantidadFiltro">
                                <input onChange={()=>checkCantidad.checked? CheckPrecio.checked = false:""} className="form-check-input" type="checkbox" role="switch" id="checkCantidad"/>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                                <label htmlFor="cantidad"> cantidad de 0 a 
                                    <select onInput={(e)=>setCantidad(e.target.value)} name="cantidad"  id="cantidad">
                                        <option value=""></option>
                                        <option value="2">2</option>
                                        <option value="4">4</option>
                                        <option value="6">6</option>
                                        <option value="8">8</option>
                                        <option value="15">15</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                            <input onClick={filtrarCantidad} className="btn btn-primary " type="button" value="filtrar" id="botonFiltrar"/>
                    </div>
        </>

    );
};