import { useEffect } from "react";
import { useState } from "react";
import { Separador } from "../../toolsDev/separacion";

// eslint-disable-next-line react/prop-types
export const BarInfo=({data})=>{

    const [totalUnitis, setTotalUnitis]=useState();
    const [totalPrice, setTotalPrice]=useState();
    const [totalcost, setTotalcost]=useState();
    const [ganancia, setGanancia]=useState();
    
    useEffect(()=>{
       sumar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data]);

    function sumar() {
         const sumado=[]
         const sumUnid=[]
         const sumCos=[]
        // eslint-disable-next-line react/prop-types
        for (let i = 0; i < data.length; i++) {
            // eslint-disable-next-line react/prop-types
           // sumado.push(parseFloat(data[i].precio.replace(".", "")))
            // eslint-disable-next-line react/prop-types
           // sumUnid.push(parseFloat(data[i].unidades))
            // eslint-disable-next-line react/prop-types
           // sumCos.push(parseFloat(data[i].costo.replace(".", "")))
        }
        const sumPrice=sumado.reduce((a, e)=>{
            return a + e
        }, 0);
        const sumUnit=sumUnid.reduce((a, e)=>{
            return a + e
        }, 0);
        const sumCost=sumCos.reduce((a, e)=>{
            return a + e
        }, 0);

        const ganancia= sumPrice - sumCost;

        setTotalUnitis(sumUnit);
        setTotalPrice(sumPrice);
        setTotalcost(sumCost);
        setGanancia(ganancia)

        
    }
    return(
        <>
           <div className="infoProducts">
                <span>unidades: {totalUnitis}</span>
                <span>t. costo: {totalcost&&Separador(totalcost)}</span>
                <span>t. valor: {totalPrice&&Separador(totalPrice)}</span>
                <span>ganancia: {ganancia&&Separador(ganancia)}</span>
                
            </div>
        </>

    );
};