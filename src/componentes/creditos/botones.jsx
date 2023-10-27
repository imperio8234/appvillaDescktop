import { faCartPlus,  faRectangleList, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { faTrashCan} from "@fortawesome/free-regular-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// eslint-disable-next-line react/prop-types
export const Botones = ({clase, seleccionado, item, handlerClick}) => {
    return (
        <div className={seleccionado == null ?`d-flex justify-content-between align-items-center ${clase} contmobilbtn`: `d-flex justify-content-between align-items-center fs-6 contmobilbtn card position-absolute`}>
        <div onClick={() => handlerClick("abonar",item)} className="abonar btnCreditos btn fs-6 text-success-emphasis"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-dash " viewBox="0 0 16 16">
  <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg><span className="ms-2">abonar</span> </div>
        <div onClick={() => handlerClick("sumar", item)} className="sumar btnCreditos btn fs-6 text-success"><FontAwesomeIcon icon={faCartPlus}/><span className="ms-2">agregar</span></div>
        <div onClick={() => handlerClick("historial", item)} className="historial btnCreditos btn fs-6 "><FontAwesomeIcon icon={faRectangleList} /><span className="ms-2">historial</span></div>
        <div onClick={() => handlerClick("edit", item)} className="edit btnCreditos btn fs-6"><FontAwesomeIcon icon={faUserPen}/> </div>
        <div onClick={() => handlerClick("delet",item)} className="delet btnCreditos btn fs-6 text-danger"><FontAwesomeIcon  icon={faTrashCan}/></div>
        </div>
    )

}