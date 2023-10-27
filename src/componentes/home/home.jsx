import { useState, useEffect } from "react";
import "../../css/home/home.css";
import "../../css/home/components.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { Navegador } from "./componentesHome/navegador";
//import { ContentComponents } from "../inventario/contenedorProductos";
import { Link, Outlet } from "react-router-dom";





// eslint-disable-next-line react/prop-types
export const Home=({setLogin})=>{

    const [openM, setOpenM]=useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showDias, setShowDias] = useState(false);


    setTimeout(() => {
      setShowDias(true)
    }, 4000);
  useEffect(() => {
 
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cerrarSesion= () => {
    setLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("prueba");
  }
 

  // cmbio de color de los botones
  const changeColorBtn = (elemento) => {
    setOpenM(false)
    const changeColorBtn = document.querySelectorAll(".btnChangeclic");
   changeColorBtn.forEach(e => {
    if(e.classList == elemento.target.classList) {
      e.classList.add("btnChange")
    } else {
      e.classList.remove("btnChange")
    }
   })
}
    
    return(
        <div className="w-100 h-100 bg-light contenthome">
          
       
            <div  className={openM?"contentMenu":"contentMenu closeMenu"}>
            {
              windowWidth <= 700 && 
              <div className=" ps-4 pe-2 bg-opacity-10 bg-dark cont-header-medio d-flex justify-content-between w-100 align-items-center">
                 <span onClick={()=> setOpenM(false) } className="fs-1 pointer">&times;</span>
              </div>
            }
              <div className={showDias?"dias-prueba z-1 d-none":"dias-prueba z-1"}>
                <p>faltan {JSON.parse(localStorage.getItem("prueba"))} dias de prueba</p>
              </div>
                <div className="contentLog p-3">
                   <p>nombre del negocio </p>
                </div>
                <div className="buttonsMenu">
                    {windowWidth <= 700 && <Navegador changeColorBtn={changeColorBtn}></Navegador>}
                    <Link onClick={(e) => {changeColorBtn(e), cerrarSesion() }} className="cerrarSesion span btnChangeclic">cerrar  sesion</Link>
                    <Link onClick={(e) => {changeColorBtn(e)}} className="editarPerfil span btnChangeclic" to={"/perfil"}>editar perfil</Link>
                    <Link onClick={(e) => changeColorBtn (e)} className="contacto span btnChangeclic">contacto</Link>

                </div>

            </div>
            
            <div className="contentNavigate">
                 <div className="desplMenu fs-3">
                 <FontAwesomeIcon onClick={()=>openM == true?setOpenM(false):setOpenM(true)} className="" icon={faBars} />

                 </div>
                <div className="navButtons" id="barMenu">
                   <Navegador changeColorBtn= {changeColorBtn}></Navegador>
                </div>
            </div>

            {/*contenedoresde los componentes<ContentComponents width={windowWidth}/>*/}
          
           <Outlet />
        </div>
    )
}