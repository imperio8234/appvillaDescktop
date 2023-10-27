import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import {SnackbarProvider,  enqueueSnackbar} from "notistack"

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  useEffect(() => {
    GetUser();
  }, [])
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    const user = {
      nombre: userName,
      correo: userEmail,
      celular: userPhone,
    }
   
    try {
      const res = await fetch("http://localhost:2000/api/v1/user", {
        method: "PUT",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const result = await res.json();
      if (result.success) {
        enqueueSnackbar("se actualizo ", {variant: "success"})
         setEditing(false);
      }
    } catch (error) {
      enqueueSnackbar(error, {variant: "error"})
    }
    
  };

 const GetUser = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/v1/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      })
      const result = await res.json();
      if (result.success) {
        setUserData(result.data[0])
      } 
    } catch (error) {
      console.log(error)
    }
 }
  return (
   <SnackbarProvider>
     <div className="contentProductos w-100 d-flex justify-content-center mt-4">
      <div className='card w-75 p-4'>
        <div className='card-header'>
          <p className='card-title'>perfil de usuario </p>
        </div>
        <div className='card-body d-flex justify-content-center w-100 text-start container object-fit-scale'>
          <div className='row h-50 mt-5'>
          <div className='d-flex gap-4 justify-content-center align-items-center border-bottom'>
          <div className='link-offset-2 link-underline col-6'>
            <label className='form-label' htmlFor="nombre">Nombre</label>
            {
              editing? 
              <input onChange={(e) => setUserName(e.target.value)} className='form-control form-control-sm' type="text" name="nombre" id="nombre" />
              : <p>{userData.nombre}</p>
            }
          </div>
          <div className=' col-6'>
            <label className='form-label' htmlFor="nombre">Correo</label>
            {
              editing? 
              <input onChange={(e) => setUserEmail(e.target.value)} className='form-control form-control-sm' type="text" name="nombre" id="nombre" />
              : <p>{userData.correo}</p>
            }
          </div>
          </div>
          <div className='d-flex gap-4 justify-content-center align-items-center border-bottom'>
          <div className=' col-6'>
            <label className='form-label' htmlFor="nombre">Celular</label>
            {
              editing? 
              <input onChange={(e) => setUserPhone(e.target.value)} className='form-control form-control-sm' type="text" name="nombre" id="nombre" />
              : <p>{userData.celular}</p>
            }
          </div>
          <div className=' col-6'>
            <label className='form-label' htmlFor="nombre">Contraseña</label>
            {
              editing? 
              <input onChange={(e) => setUserPass(e.target.value)} className='form-control form-control-sm' type="text" name="nombre" id="nombre" />
              : <p>......</p>
            }
          </div>
          </div>

          </div>
        </div>
        <div className=''>
          {
            editing?
            <div className='d-flex w-50 gap-5'>
              <div onClick={() => setEditing(false)} className='btn btn-danger'>cancelar</div>
              <div onClick={() => handleSaveClick()} className='btn btn-success'>guardar</div>
            </div>
            : 
            <div className='w-50'>
               <div onClick={() => handleEditClick()} className='btn btn-secondary'>editar perfil</div>
            </div>
          }

        </div>

      </div>
      
    </div>
   </SnackbarProvider>
  );
};

export default UserProfile;
