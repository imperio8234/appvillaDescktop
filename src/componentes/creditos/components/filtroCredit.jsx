import { enqueueSnackbar } from "notistack";
import { useState } from "react";

//eslint-disable-next-line react/prop-types

export const Filtro=({filtro, filtrarProduct})=>{

    const [cantidad, setCantidad]=useState("");
    const [valor, setValor]=useState("");

                // variables para 
                const [startDate, setStartDate] = useState('');
  const [debtAmount, setDebtAmount] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleDebtAmountChange = (event) => {
    setDebtAmount(event.target.value);
  };

  const handleFilterClick = () => {
    const filters = {
      startDate,
      debtAmount,
    };
   // handleFilter(filters);
  };
        
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
          <div className={filtro?"menuFiltrar card position-absolute":"menuFiltrar esconderMenuFiltrar"}>
          <div className="row d-flex flex-column align-items-center">
        <div className="col-md-4 w-100">
          <label htmlFor="startDate">Fecha de inicio:</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="col-md-4 w-100">
          <label htmlFor="debtAmount">Cantidad de deuda:</label>
          <input
            type="number"
            id="debtAmount"
            className="form-control"
            value={debtAmount}
            onChange={handleDebtAmountChange}
          />
        </div>
        <div className="col-md-4 mt-4">
          <button
            className="btn btn-primary"
            onClick={handleFilterClick}
          >
            Filtrar
          </button>
        </div>
      </div>
                    </div>
        </>

    );
};