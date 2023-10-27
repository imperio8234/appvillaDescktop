import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {CurrentDate} from "../../../../toolsDev/useCurrentDate"
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Subscripcion } from "../../../pagarMensualidad/subscripcion";

// eslint-disable-next-line react/prop-types
export const AddRecord=({sendNameRecord, showAddRecord, setShowAddRecord, idCredito})=>{

    const [product, setProduct]=useState("");
   // const [date, setDate]=useState();
    const [value, setValue]=useState("");
    const [subscripcion, setSubscripcion] = useState(false);

    // send api 

    function sendApi(){
      const objRecord={
        idCredito:idCredito,
        producto:product,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        fecha:CurrentDate(),
        valor:value
      }

     requestApi(objRecord);
  
    }

    async function requestApi(objRecord){
        try {
            await axios.post("http://localhost:2000/api/v1/addcredit-record", objRecord,{withCredentials:true})
            .then(e => {
                if (e.data.success) {
                    enqueueSnackbar(`${e.data.message}`, {variant: "success"});
                setProduct("");
                setValue("");
                setShowAddRecord(false)
                } else {
                    if (e.message) {
                        setSubscripcion(true)
                    } else {
                        enqueueSnackbar(`${e.data.message}`, {variant: "error"});
                    }
                }
                
            })
        } catch (error) {
            enqueueSnackbar(`error en el proceso`, {variant: "error"});
                        
        }

    }

    function cancelSend(){
        setProduct("");
        setValue("");
               
    }

   

    return(
        <div className={showAddRecord?"position-absolute bg-white justify-content-center align-items-center contaddrecord":"closeRecord"}>
            <div className="w-100 p-2">
                <FontAwesomeIcon onClick={() => setShowAddRecord(false)} className="c-p position-absolute start-0 ms-3 fs-5" icon={faXmark} />
                <span>{`${sendNameRecord} llevara`}</span>
            </div>
            <div className="formaddrecord">
                <input value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="producto" className="form-control form-control-sm mb-2" type="text" />
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