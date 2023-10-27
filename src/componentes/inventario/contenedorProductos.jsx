import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMagnifyingGlass, faFilter, faTrash, faUserPen, faRotateRight} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { ModalRegister } from "./modalRegistro";
import axios from "axios";
import {SnackbarProvider, enqueueSnackbar } from "notistack";
import Swal from "sweetalert2";
import { Filtro } from "./filtro";
import { EditProduct } from "./editProduct";
import { BarInfo } from "./barraInfo";
import { Separador } from "../../toolsDev/separacion";
import { arrayConverter } from "../../toolsDev/arrayConverter";
import { Pages } from "../creditos/components/compontsRecord/paginacion";
import { Search } from "./browser";

// eslint-disable-next-line react/prop-types
export const ContentComponents=()=>{
    //esconder menu de opciones
    const [esconder, setEsconder]=useState(false);
    const [seeModal, setSeeModal]=useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [data, setData] = useState([]);
    const [hay, setHay]=useState(false);
    const [filtro, setFiltro]=useState(false);
    const [editModal, setEditModal]=useState(false);
    const [ProductToEdit, setProductToEdit]=useState({});
    const [paginas, setPaginas]= useState([]);
    const [getpage, setGetPage]= useState(1);


    // eslint-disable-next-line no-undef
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    //get data to api
    useEffect(()=>{
        
        getApi();
    },[getpage]);

   async function getApi(){
    // eslint-disable-next-line no-undef
    Electron.invoke("getproducto").then(result => {
        console.log(result.data)
        setData(result.data)
    }
    ).catch((err) => {
        console.log(err)
    })
        

   }
   
   //delete product and edit product

   function deleteOredit(e, id){
    const product = data.find(item => item.id_producto == id);
    if(e == "delet"){ 
           //nombre del producto
           const nombre=id

        Swal.fire({
            title:"desea eliminar el producto",
            icon:"warning",
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'eliminar producto'
        }).then(res=>{
            if (res.isConfirmed) {
                //delete product
                deleteProduct(nombre);
            }
        });     
   }else if(e == "edit"){
    // names of the date to change  
    const nombre=product.nombre;
    const unidades=parseInt(product.unidades);
    const laboratorio= product.laboratorio;
    const costo= product.costo;
    const precio= product.precio;
    //object
    const ProductToEdit={
        nombre:nombre,
        unidades:unidades,
        laboratorio:laboratorio,
        costo:costo,
        precio:precio,
        id_producto: id
    }
    console.log(product);
    console.log(ProductToEdit)
    //insert object to component
      setProductToEdit(ProductToEdit)
    //Show modal
      if (editModal) {
        setEditModal(false);
      }else{
        setEditModal(true);
      }
   }
  } 
//request api delete
async function deleteProduct(producto){
    try {
       await axios.delete(`http://localhost:2000/api/v1/productos/${producto}`, {withCredentials: true})
        .then(res=>{
            if(res.data.success){
                enqueueSnackbar("se elimino correctamente",{variant:"success"})
                getApi();
            }
        });
    } catch (err) {
       enqueueSnackbar(err,{variant:"error"})
    }
  }
  
          //comprovar si hay productos registrados para actualizar 
          useEffect(()=>{
           
            if (data.length <= 0) {
                setHay(false);
            }else{
                setHay(true);
            }
          },[data]);
          

          /// filtrar producto 
         async function filtrarProduct(e){
            const product=JSON.stringify(e);
              try {
                await axios.get(`http://localhost:2000/getproducts/filtro/${product}`)
                .then(res =>{
                    if (res.data.success) {
                        setData(res.data.data)
                        enqueueSnackbar("productos encontrados", {variant:"success"})
                    }else{
                        enqueueSnackbar("no se encontro ningun producto",{variant:"info"})
                    }
                })
              } catch (error) {
                enqueueSnackbar(error, {variant:"error"})
                
              }
          }

          //componente

    return(
        <>
     
<div className="contentProductos ">
    <SnackbarProvider />
        
            <div className="contentOptionsNav">
                <div className={!esconder?"buttonsOptionsNav":"buttonsOptionsNav translate"}>
                        <span onClick={()=>seeModal?setSeeModal(false):setSeeModal(true)} className="register "> registrar productos</span>
                        <span onClick={()=>filtro?setFiltro(false):setFiltro(true)} className="btnFiltrar"> filtrar<FontAwesomeIcon className="ps-2" icon={faFilter}></FontAwesomeIcon></span>
                        {/*mostrar filtro */}
                        <Filtro filtrarProduct={filtrarProduct} filtro={filtro}/>
                        {/* modal*/}
                       {seeModal ? <ModalRegister getApi={getApi} seeModal={seeModal} setSeeModal={setSeeModal}></ModalRegister>: ""}
                        <EditProduct ProductToEdit={ProductToEdit} getApi={getApi} editModal={editModal} setEditModal={setEditModal} />
                </div>

                   <FontAwesomeIcon icon={faMagnifyingGlass} className={windowWidth >= 700?'esconderIcono':'imgOptionsSearch'} onClick={()=>!esconder&&setEsconder(true)}/>
                <div className={esconder?"searchOptionsNav":"searchOptionsNav translateSearch"}>
                    <FontAwesomeIcon  icon={faArrowRight} className={windowWidth >= 700?'esconderIcono':'mostrarFlecha'} onClick={()=>esconder&&setEsconder(false)}/>
                    <Search getApi={getApi} setData={setData} />
                </div>
            </div>
            <div className="addProducts">
                <table className="productos">
                       <thead>
                        <tr className="headTable">
                            <th>unidades</th>
                            <th>nombre del producto</th>
                            <th>laboratorio</th>
                            <th>costo</th>
                            <th>precio</th>
                            <th></th>
                            <th onClick={()=>getApi()} className="recharge"><FontAwesomeIcon  className="fs-5" icon={faRotateRight} /></th>
                        </tr>   
                       </thead>             
                    <tbody className="bodyProducts">
                        {
                           hay?data.map(item=>{
                                return(
                                    <tr key={Math.random()}>
                                    <td>{item.unidades}</td>
                                    <td className="texto">{item.nombre}</td>
                                    <td>{item.laboratorio}</td>
                                    <td>{Separador(item.costo)}</td>
                                    <td>{Separador(item.precio)}</td>
                                    <td>
                                        <div className="w-100 d-flex">
                                            <div onClick={() => deleteOredit("edit", item.id_producto)} className="btn btnCreditos rounded text-dark"><FontAwesomeIcon icon={faUserPen} /></div>
                                            <div onClick={() => deleteOredit("delet", item.id_producto)} className="btn btnCreditos rounded text-danger"><FontAwesomeIcon icon={faTrash} /></div>
                                        </div>
                                    </td>
                                    </tr>
                                )
                            })
                            // eslint-disable-next-line react/no-unknown-property
                            :<tr><td colSpan={5} className="text-center">agrega un producto</td></tr>
                        }
                    </tbody>
                </table>
            </div>
                 {/* bar of Information*/}
                
        </div> 
        <Pages setGetPage={setGetPage} paginas={paginas}/>
         <BarInfo data={data}/>
        </>
    );
};