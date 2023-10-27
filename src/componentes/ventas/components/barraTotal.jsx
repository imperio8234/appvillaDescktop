import { Separador } from "../../../toolsDev/separacion"

// eslint-disable-next-line react/prop-types
export const Barra = ({venta}) => {
    return (
        <div className="cont-bar">
            <div className="cont-total">
                <span>total: {venta? Separador(venta): 0}</span>
            </div>
        </div>
    )
}