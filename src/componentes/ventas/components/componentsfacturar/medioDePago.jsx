// eslint-disable-next-line react/prop-types
export const MedioPago= ({setEfectivo, close}) => {
    return (
        <div className="cont-medio bg-white">
            <div className="ps-2 pe-2 bg-opacity-10 bg-dark cont-header-medio d-flex justify-content-between w-100 align-items-center">
                    <span>medio de Pago</span>
                    <span onClick={()=> close(false) } className="fs-1 pointer">&times;</span>
                </div>
            <div className="cont-efectivo h-75 d-flex justify-content-center align-items-center">
                
                <div onClick={() => setEfectivo("efectivo")} className="pointer imagen-efectivo border border-dark-subtle  p-3">
                    <img className="" title="efectivo" src="../../../../public/imagenes/icons8-dinero-96.png" alt="efectivo" />
                    <p>Efectivo</p>
                </div>
                <div onClick={() => setEfectivo("credito")} className="pointer imagen-efectivo border border-dark-subtle  p-3">
                    <img className="" title="efectivo" src="../../../../public/imagenes/icons8-dinero-96.png" alt="efectivo" />
                    <p>credito</p>
                </div>
            </div>
        </div>
    )
}