import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Separador } from "../../../toolsDev/separacion";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
export const Historial=({showRecord, setShowRecord, sendNameRecord, idCredito})=>{

    const [getRecord, setGetRecord] = useState([]);
    const [showTable1, setShowTable1] = useState(true)
    const [showTable2, setShowTable2] = useState(false)
    const [abonos, setAbonos] = useState([])
    const [valorAbonos, setValorAbonos] = useState(0);
    const [valorNuevos, setValorNuevos] = useState(0);   
    const [debe, setDebe] = useState(0);   
   
    // get record
    

        async function askToApi() {
            try {
                 await axios.get(`http://localhost:2000/api/v1/addcredit-record/${idCredito}/1`, {withCredentials: true})
                 .then(e => {
                    if (e.data.success) {
                        setGetRecord(e.data.data)
                    } else {
                        enqueueSnackbar("no hay registros", {variant: "info"})
                    }
                 })
        
            } catch (err) {
                  if (err) {
                    enqueueSnackbar(err, {variant: "error"});
                  }
                    
            }
           }   
            

           async function getAbonos(){
                try {
                    await axios.get(`http://localhost:2000/api/v1/substractcredit-record/${idCredito}/1`, {withCredentials: true})
                    .then(e => {
                        if (e.data.success) {
                            setAbonos(e.data.data.data);                                                       
                        } else {
                            enqueueSnackbar(e.data.message + " " + "en abonos", {variant: "info"})
                        }
                    })
                } catch (error) {
                    if (error) {
                        enqueueSnackbar(error, {variant: "error"});                      
                    }
                    
                }
            }
          
     useEffect(()=>{
            askToApi();
            getAbonos();
    }, [idCredito]);
    // peticiones

    useEffect(() => {
        valorTotal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [abonos, getRecord])
    const valorTotal =  () => {
        const valoresAbonos = abonos.map(abono => parseInt(abono.valor));
    const valoresNuevos = getRecord.map(record => parseInt(record.valor));     
    const sumaAbonos = valoresAbonos.reduce((a, b) => a + b, 0);
    const sumaNuevos = valoresNuevos.reduce((a, b) => a + b, 0);
    setValorAbonos(sumaAbonos);
    setValorNuevos(sumaNuevos);
    setDebe(sumaAbonos - sumaNuevos);
    }

    const deleteItem = async (url) => {
       Swal.fire({
        title:`desea eliminar a el registro`,
        icon:"warning",
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'eliminar registro'
       }).then( async res =>  {
        if (res.isConfirmed) {
            try {
                const res = await fetch(url, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "content-type": "application/json"
                    }
                });
                const resultado = await res.json();
                if (resultado.success) {
                    enqueueSnackbar(resultado.message, {variant: "success"})
                    askToApi();
                    getAbonos();
                }
            } catch (error) {
                enqueueSnackbar("error", {variant: "error"})
            }  
        } 
       })

    }

        return(
        <div className="contentHistory d-flex flex-column">
            <div className="w-100">
            <FontAwesomeIcon onClick={()=>showRecord?setShowRecord(false):setShowRecord(true)} className="c-p fs-5 position-absolute top-0 start-0 m-2" icon={faXmark} />
            <span className="">{sendNameRecord} </span>
            </div>
             <div className="botonesHistorial">
                <div onClick={() =>{showTable1?setShowTable2(false): setShowTable1(true); setShowTable2(false)}} className={!showTable1?"historial1": "historial1 bg-primary"}>abonas</div>
                <div onClick={() => {!showTable2 && setShowTable2(true); setShowTable1(false)}} className={!showTable2?"historial2":"historial2 bg-primary"}>nuevos registros</div>
             </div> 
             <div className="valorTotal">
                <span> {valorAbonos >= valorNuevos?"cancelado":"Debe"+ ":" + Math.abs(debe)}</span>
             </div>           
            <div className="d-flex w-100 gap-4 contTable " >
           <div className={showTable1?"tabla-1 scrollstyle pe-2 w-100":"tabla-1 scrollstyle pe-2 w-100 ocultar"}>
            <span>abonos</span>
           <table className="table-1 table table-striped">
                <thead>
                                        <tr>
                        <th scope="col">fecha </th>
                        <th scope="col">valor</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody >
                   
                    {!abonos.length <= 0?
                        abonos.map((item, index)=> {
                            return (
                                <tr key={index} className="bg-dark">
                            <td>{item.fecha}</td>
                            <td>{item.valor}</td>
                            <td>
                                <div className="w-100 d-flex">
                                <div className="btn btnCreditos rounded text-primary"><FontAwesomeIcon icon={faUserPen}/></div>
                                <div onClick={() => deleteItem(`http://localhost:2000/api/v1/substractcredit-record/${item.id_abono}`)} className="btn btnCreditos rounded text-danger"><FontAwesomeIcon icon={faTrashCan}/></div>
                                
                               </div>
                            </td>
                        </tr>
                            ) 
                        })
                        : <tr><td colSpan={5} className="text-center">ingresa un registro</td></tr>}                  
                </tbody>
            </table>
           </div>

           {/* tabla 2 */}
           <div className={showTable2?"tabla-2 w-100 scrollstyle pe-2":"tabla-2 w-100 scrollstyle pe-2 ocultar"}>
           <span>nuevo registro</span>
           <table className="table table-striped" >
                <thead className="">
                                    <tr>
                        <th>fecha</th>
                        <th>producto</th>
                        <th>valor</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                
                    {!getRecord.length <= 0?
                        getRecord.map((item, index) => {
                            return(
                                 <tr key={index}>
                                    <td>{item.fecha}</td>
                                    <td>{item.producto}</td>
                                    <td>{item.valor}</td>
                                    <td>
                                       <div className="w-100 d-flex">
                                          <div className="btn btnCreditos rounded text-primary"><FontAwesomeIcon icon={faUserPen}/></div>
                                          <div onClick={() => deleteItem(`http://localhost:2000/api/v1/addcredit-record/${item.id_suma}`)} className="btn btnCreditos rounded text-danger"><FontAwesomeIcon icon={faTrashCan}/></div>
                                
                                       </div>
                                    </td>
                                </tr>

                            )
                        })
                    : <tr><td colSpan={5} className="text-center">ingresa un registro</td></tr>}
                   
                   
                </tbody>
            </table>
           </div>
           <span className="valor-tabla2">total: {valorNuevos?Separador(valorNuevos): "0000"}</span>  
           <span className="valor-tabla1">total: {valorNuevos?Separador(valorAbonos): "0000"}</span>  

              </div>
        </div>
    );
};