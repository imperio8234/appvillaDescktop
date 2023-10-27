// eslint-disable-next-line react/prop-types
export const CardVenta = ({precio, producto, item, agregar}) => {
    return (
        // eslint-disable-next-line react/prop-types
        <div onClick={()=>item.unidades <= 0? "":agregar({...item}, 1)} className={item.unidades <= 0?"card d-flex flex-fill p-3 bg-secondary cardVenta":"card d-flex flex-fill p-3 pointer cardVenta"}>
            <div>
                <div className="">
                    <img src="../../../../public/imagenes/icons8-etiqueta-50.png" alt="" />
                </div>
                <div className="card-body">
                  <p>{precio}</p>
                  <p>{producto}</p>
                </div>
            </div>

        </div>
    )
}