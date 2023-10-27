import axios from "axios";
import { useState } from "react";
import {enqueueSnackbar} from "notistack";
//import { Separador } from "../../toolsDev/separacion";
import { CurrentDate } from "../../../toolsDev/useCurrentDate";
import { Subscripcion } from "../../pagarMensualidad/subscripcion";

// eslint-disable-next-line react/prop-types
export const EditCustomer=({getApi, idCredito, editModal, setEditModal, customerEdit})=>{
    const [nombre, setNombre]=useState("");
    const [fecha, setfecha]=useState("");
    const [celular, setcelular]=useState("");
    const [subscripcion, setSubscripcion] = useState(false);

    const customerToEdit=customerEdit;

    //optener informacion cancelar el furmulario y guardarlo
   

    const upDateAndDelete=(e)=>{
        const date = CurrentDate();
        const customer={
            nombre:nombre || customerToEdit.nombre,
            idCredito:idCredito,
            fecha: date,
            celular:celular?celular:customerToEdit.celular
        }
        e.preventDefault();
        if(e.target.name == "cancelar"){
            setEditModal(false);
           formatearFormulario();
        }else{
            // verificar la  si los datos son correctos
            const verify = /^[0-9]+$/; 
            if (verify.test(celular)) {
                enviarApi(customer)
            } else {
                enqueueSnackbar("la cadena contiene letras escribe un numero valido", {variant: "error"})
            }
        }

       async function enviarApi(customer){

            try { 
                await axios.put(`http://localhost:2000/api/v1/creditos`, customer, {withCredentials: true})
                .then(res=>{
                    if(res.data.success){
                        getApi();
                        enqueueSnackbar("se actualizo exitosamente",{variant:"success"});
                        setEditModal(false);
                        formatearFormulario();
                   
                    }
                    if (res.message) {
                        setSubscripcion(true)
                    }
                });
                    
            } catch (error) {
                console.log(error)
            enqueueSnackbar(error, {variant:"error"})
                
            }
        }
        // formatear formulario 
        function formatearFormulario(){
             //formatear formulario
             setNombre("");
             setcelular("");
             setfecha("");
        }

    };
    return(
        <>
         <div onClick={(e)=>{e.target.className == "modalRegister" &&setEditModal(false)}} className={editModal?"modalRegister":"modalRegister closedModal"}>
                    <div className="formularioProducts">
                        <form className="formuR form-control">
                        
                            <label  htmlFor="customer">
                                actualizar credito
                                <input placeholder={customerToEdit.nombre} onChange={(e)=>setNombre(e.target.value)} className="form-control" name="customer" id="customer" type="text" value={nombre} />
                            </label>
                            <label htmlFor="celular">
                                celular
                                <input placeholder={customerToEdit.celular} onChange={(e)=>setcelular(e.target.value)} className="form-control" name="celular" id="celular" type="text" value={celular}/>
                            </label>
                            <label  htmlFor="un">
                                fecha
                                <input disabled placeholder={CurrentDate()} onChange={(e)=>setfecha(e.target.value)} className="form-control" name="un" id="un" type="text" value={fecha}/>
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