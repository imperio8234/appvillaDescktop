import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {CurrentDate} from "../../../../toolsDev/useCurrentDate"
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Subscripcion } from "../../../pagarMensualidad/subscripcion";

// eslint-disable-next-line react/prop-types
export const SubstractRecord=({sendNameRecord, showSubstractRecord, setShowSubstractRecord, idCredito})=>{
    const [value, setValue]=useState("");
    const [subscripcion, setSubscripcion] = useState(false);


    // send api 

    function sendApi(){
      const objRecord={
        idCredito:idCredito,
        fecha:CurrentDate(),
        valor:value
      }
     requestApi(objRecord);
  
    }

    async function requestApi(objRecord){
        try {
            await axios.post(`http://localhost:2000/api/v1/substractcredit-record`, objRecord, {withCredentials:true})
            .then(e => {
                if (e.data.success) {
                    enqueueSnackbar(`${e.data.message}`, {variant: "success"});
                setValue("");
                setShowSubstractRecord(false)
                    
                } else {
                    if (e.status == 500) {
                        setSubscripcion(true)
                    } else {
                        enqueueSnackbar(`${e.data.message}`, {variant: "error"}) 
                    }           
                }
            })
        } catch (error) {
            enqueueSnackbar(`error en el proceso`, {variant: "error"});
                        
        }

    }

    function cancelSend(){
        setValue("");
               
    }

   

    return(
        <div className={showSubstractRecord?"position-absolute bg-white justify-content-center align-items-center contaddrecord":"closeRecord"}>
            <div className="w-100 p-2">
                <FontAwesomeIcon onClick={() => setShowSubstractRecord(false)} className="c-p position-absolute start-0 ms-3 fs-5" icon={faXmark} />
                <span>{`${sendNameRecord} abono`}</span>
            </div>
            <div className="formaddrecord">
                <input disabled placeholder={CurrentDate()} className="form-control form-control-sm mb-2" type="text" />
                <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="valor" className="form-control form-control-sm mb-2" type="text" />
            </div>
            <div className="w-100 d-flex justify-content-around">
                <input onClick={()=> cancelSend()} className="btn btn-danger btn btn-sm" type="button" value="cancelar" />
                <input onClick={()=> sendApi()} className="btn btn-success btn btn-sm" type="button" value="guardar" />
            </div>
            {subscripcion && <Subscripcion setSubscripcion={setSubscripcion} />}
        </div>

    )
};