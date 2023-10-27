import axios from "axios";
import { useState } from "react";
import {enqueueSnackbar} from "notistack";
import { Separador } from "../../toolsDev/separacion";
import { Subscripcion } from "../pagarMensualidad/subscripcion";

// eslint-disable-next-line react/prop-types
export const EditProduct=({getApi, editModal, setEditModal, ProductToEdit})=>{
    const [nombre, setNombre]=useState("");
    const [unidades, setUnidades]=useState("");
    const [laboratorio, setLaboratorio]=useState("");
    const [costo, setCosto]=useState("");
    const [precio, setPrecio]=useState("");
    const [subscripcion, setSubscripcion] = useState(false);

    const ObjProductEdit=ProductToEdit
    //optener informacion cancelar el furmulario y guardarlo
   

    const upDateAndDelete=(e)=>{
        const producto={
            nombre:nombre?nombre:ObjProductEdit.nombre,
            unidades:unidades?unidades:ObjProductEdit.unidades,
            laboratorio:laboratorio?laboratorio:ObjProductEdit.laboratorio,
            costo:costo?costo:ObjProductEdit.costo,
            precio:precio?precio:ObjProductEdit.precio,
            idProduct: ObjProductEdit.id_producto
        }
        e.preventDefault();
        if(e.target.name == "cancelar"){
            setEditModal(false);
           formatearFormulario();
        }else{
            
            enviarApi(producto)
        }

       async function enviarApi(producto){
            try {
                await axios.put("http://localhost:2000/api/v1/productos",producto, {withCredentials:true})
                .then(res=>{
                    if(res.data.success){
                        getApi();
                        enqueueSnackbar("se actualizo exitosamente",{variant:"success"});
                        setEditModal(false);
                        formatearFormulario();
                   
                    }})
            } catch (error) {
            enqueueSnackbar(error, {variant:"error"})
                
            }
        }
        // formatear formulario 
        function formatearFormulario(){
             //formatear formulario
             setNombre("");
             setLaboratorio("");
             setCosto("");
             setPrecio("");
             setUnidades("");
        }

    };
    return(
        <>
         <div onClick={(e)=>{e.target.className == "modalRegister" &&setEditModal(false)}} className={editModal?"modalRegister":"modalRegister closedModal"}>
                    <div className="formularioProducts">
                            actualizar
                        <form className="formuR form-control">
                        
                            <label  htmlFor="producto">
                                nombre del produco
                                <input  placeholder={ObjProductEdit.nombre} onChange={(e)=>setNombre(e.target.value)} className="form-control" name="producto" id="producto" type="text" value={nombre} />
                            </label>
                            <label  htmlFor="un">
                                unidades
                                <input placeholder={ObjProductEdit.unidades} onChange={(e)=>setUnidades(e.target.value)} className="form-control" name="un" id="un" type="number" value={unidades}/>
                            </label>
                            <label htmlFor="laboratorio">
                                laboratorio
                                <input placeholder={ObjProductEdit.laboratorio} onChange={(e)=>setLaboratorio(e.target.value)} className="form-control" name="laboratorio" id="laboratorio" type="text" value={laboratorio}/>
                            </label>
                            <label htmlFor="costo">
                            costo
                                <input placeholder={ObjProductEdit.costo && Separador(ObjProductEdit.costo)} onChange={(e)=>setCosto(e.target.value)} className="form-control" name="costo" id="costo" type="text" value={costo} />
                            </label>
                            <label htmlFor="precio">
                                precio de venta
                                <input placeholder={ObjProductEdit.precio && Separador(ObjProductEdit.precio)} onChange={(e)=>setPrecio(e.target.value)} className="form-control" name="precio" id="precio" type="text"value={precio}/>
                            </label>

                            <div className="buttonsProucts  mt-5">
                                <button name="cancelar" onClick={(e)=>upDateAndDelete(e)} className="btn btn-danger btnCancel">cancelar</button>
                                <button name="upDate"onClick={(e)=>upDateAndDelete(e)}  className="btn btn-success btnUpdate">guardar</button>
                            </div>

                        </form>                   
                    </div>
            </div> 
            {subscripcion && <Subscripcion setSubscripcion={setSubscripcion} />}

        </>

    );
};