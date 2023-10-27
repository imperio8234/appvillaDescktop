import axios from "axios";
import { useState } from "react";
import {enqueueSnackbar} from "notistack";
import { CurrentDate } from "../../../toolsDev/useCurrentDate";
import { Subscripcion } from "../../pagarMensualidad/subscripcion";

// eslint-disable-next-line react/prop-types
export const ModalRegister=({seeModal, setSeeModal, getApi})=>{

    

    const [nombre, setNombre]=useState("");
    const [phoneNumber, setphoneNumber]=useState("");
    const [date, setdate]=useState("");
    const [subscripcion, setSubscripcion] = useState(false);
    

    //optener informacion cancelar el furmulario y guardarlo

    const upDateAndDelete=(e)=>{
        const producto={
            idUsuario:1,
            nombre:nombre,
            phoneNumber:phoneNumber,
            date:CurrentDate()           
        }
        e.preventDefault();
        if(e.target.name == "cancelar"){
            setSeeModal(false);
            //formatear formulario
            setNombre("");
            setdate("");
            setphoneNumber("");
        }else{
            // verificar el celuar
            const verify = /^[0-9]+$/;

            if (verify.test(phoneNumber)) {
                enviarApi(producto)
            } else {
                enqueueSnackbar("la cadena contiene letras escribe un numero valido", {variant: "error"})
            }
           
        }

       async function enviarApi(producto){
            try {
                await axios.post("http://localhost:2000/api/v1/creditos",producto, {withCredentials:true})
                .then(res=>{
                    if(res.data.success){
                        getApi();
                        enqueueSnackbar("se guardo exitosamente",{variant:"success"});
                    }else{
                        if (res.message) {
                            setSubscripcion(true)
                        } else {
                            if (res.message) {
                                setSubscripcion(true);
                            } else {
                                enqueueSnackbar(res.data.message,{variant:"error"});
                            }
                        }
                        
                    }})
            } catch (error) {
            enqueueSnackbar(error, {variant:"error"})
                
            }
        }

    };

    return(
        <>

            <div onClick={(e)=>{e.target.className == "modalRegister"&&setSeeModal(false)}} className={seeModal?"modalRegister":"modalRegister closedModal"}>
                    <div className="formularioProducts">
                            REGISTRAR CLIENTE
                        <form className="formuR form-control form-control-sm">
                        
                            <label  htmlFor="producto">
                                nombre 
                                <input onChange={(e)=>setNombre(e.target.value)} className="form-control form-control-sm" name="producto" id="producto" type="text" value={nombre} />
                            </label>
                            <label  htmlFor="un">
                                celular
                                <input onChange={(e)=>setphoneNumber(e.target.value)} className="form-control form-control-sm" name="un" id="un" type="text" value={phoneNumber}/>
                            </label>
                            <label htmlFor="date">
                                fecha
                                <input disabled placeholder={CurrentDate()}  className="form-control form-control-sm" name="date" id="date" type="text" value={date}/>
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