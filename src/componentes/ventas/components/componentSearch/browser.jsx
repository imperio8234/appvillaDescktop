import { faBarcode, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react"
import { Subscripcion } from "../../../pagarMensualidad/subscripcion";

// eslint-disable-next-line react/prop-types
export const Search = ({ setData, agregar}) => {
    const [words, setWords] = useState([]);
    const [subscripcion, setSubscripcion] = useState(false);
    const [showBarCode, setShowBarCode] = useState(true);

     //// buscar producto   
        
     async function buscador(e){
        let formatCode = `code, ${words}`
        // eslint-disable-next-line no-undef
        const datares = await Electron.invoke("findProduct", {data:words});
        if (datares.success) {
            setData(datares.data)
            
            if (!showBarCode && datares.data) {
                agregar({...datares.data[0]},1);
                setWords("");
             }

        }else {
            setData([]);
        }
       
       
     }
        // actualizar pagina
        let timeOut= null 
    useEffect(() => {
        clearTimeout(timeOut);
       // eslint-disable-next-line react-hooks/exhaustive-deps
       timeOut = setTimeout(() => {
        if (!words) {
            buscador();  
        }
        }, showBarCode?300:50);

        if (words.length <= 0) {
         setWords("");
         setData([])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words]);
        
    return (
        <>
        <form onSubmit={(e)=> e.preventDefault() } action="" className="d-flex gap-3">
            <div className="search-input p-2">
            {
                    showBarCode?<input placeholder="busca el producto a vender" 
                    onInput={(e) => {
                     setWords(e.target.value)}} 
                     className="bg-white text-black form-control-sm buscador rounded-5 border-white" type="search" name="buscadorOptionsNav" id="buscadorOptionsNav" />
                     :
                     <input placeholder="codigo de barras" 
                     onInput={(e) => {
                      setWords(e.target.value)}} 
                      className="bg-white text-black form-control-sm buscador rounded-5 border-white" type="number" name="buscadorOptionsNav" id="buscadorOptionsNav" value={words}/>         
        
                }
            <div onClick={() => setShowBarCode(true)} className="link-primary"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
            <div onClick={() => setShowBarCode(false)} className="link-primary"><FontAwesomeIcon icon={faBarcode} /></div>
              </div>
          </form>
          
          {subscripcion && <Subscripcion setSubscripcion={setSubscripcion} />}
        </>
    )
}