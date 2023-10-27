import { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../src/css/home/home.css"
import "../src/css/home/components.css"
import { ContentComponents } from "./componentes/inventario/contenedorProductos";
import { Ventas } from "./componentes/ventas/contVentas";
import { ContentCredits } from "./componentes/creditos/contentCredits";
import UserProfile from "./componentes/perfil/contentProfile";
function App() {
 
  const [nombre, setNombre] = useState();
  const [nombres, setNombres] =useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openM, setOpenM]=useState(false);
  const [showDias, setShowDias] = useState(false);
  const [component, setComponent] = useState("inventario");




  function showName () {
    // eslint-disable-next-line no-undef
    Electron.send("persona",nombre)
    setNombres([...nombres,nombre])
  }
    // resize  
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    // function change color 
    const changeColorBtn = (elemento) => {
      setOpenM(false)
      const changeColorBtn = document.querySelectorAll(".btnChangeclic");
      setComponent(elemento.target.classList[0])
     changeColorBtn.forEach(e => {
      if(e.classList === elemento.target.classList) {
        e.classList.add("btnChange")
      } else {
        e.classList.remove("btnChange")
      }
     })
  }

  // close session 
  const cerrarSesion= () => {
    //setLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("prueba");
  }
  // change Components
  const changeComponents = () => {
    if (component === "ventas") {
      return <Ventas />
    } else if(component === "inventario") {
      return <ContentComponents />
    } else if(component === "creditos") {
      return <ContentCredits />
    }else if(component === "cerrarSesion") {
      return alert("aun no se define")
    }else if(component === "editarPerfil"){
      return <UserProfile />
    }
  }
  return (
   <div className="App">
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
                  <div onClick={(e) => {changeColorBtn(e); cerrarSesion()}} className="cerrarSesion span btnChangeclic">cerrar  sesion</div>
                  <div onClick={(e) => {changeColorBtn(e)}} className="editarPerfil span btnChangeclic">editar perfil</div>
                  <div onClick={(e) => changeColorBtn(e)} className="inventario span btnChangeclic" to={"/inventario"}>inventario</div>
                  <div onClick={(e) => changeColorBtn(e)} className="creditos span btnChangeclic"to={"/creditos"} >creditos</div>
                  <div onClick={(e) => changeColorBtn(e)} className="ventas span btnChangeclic"to={"/ventas"}>ventas</div>

              </div>

          </div>
          
          <div className="contentNavigate">
               <div className="desplMenu fs-3">

               </div>
              <div className="navButtons" id="barMenu">
              </div>
          </div>

          {/*contenedoresde los componentes<ContentComponents width={windowWidth}/>*/}
        
         {changeComponents()}
      </div>
   </div>
  );
}

export default App;
