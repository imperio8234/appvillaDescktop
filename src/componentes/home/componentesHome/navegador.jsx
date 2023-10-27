import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Navegador=({ changeColorBtn })=>{
    
    return(
        <>
            <Link onClick={(e) =>changeColorBtn(e)} className="metrica span btnChangeclic" to={"/"}>metrica</Link>
            <Link onClick={(e) => changeColorBtn(e)} className="inventario span btnChangeclic" to={"/inventario"}>inventario</Link>
            <Link onClick={(e) => changeColorBtn(e)} className="creditos span btnChangeclic" to={"/creditos"}>creditos</Link>
            <Link onClick={(e) => changeColorBtn(e)} className="deudas span btnChangeclic"to={"/deudas"}>compras </Link>
            <Link onClick={(e) => changeColorBtn(e)} className="ventas span btnChangeclic"to={"/ventas"}>ventas</Link>
        </>
    );
};