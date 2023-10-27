// eslint-disable-next-line react/prop-types
export const Subscripcion = ({setSubscripcion}) => {
    const close= ()=> {
        setSubscripcion(false)
    }
    return (
        <div className="subscriocion cont-pago">
            <div className="w-50 h-50 bg-light card ">
            <div className="ps-2 pe-2 bg-opacity-10 bg-dark cont-header-medio d-flex justify-content-between w-100 align-items-center">
                    <span>villa y tecneoweb te informa</span>
                    <span onClick={() =>close(false)} className="fs-1 pointer">&times;</span>
            </div>
            <div className="card-body">
             <p>Estimado usuario de Villa de Tecneo,

Queremos recordarle que su suscripción a nuestra aplicación contable ha expirado. 
No pierda la oportunidad de seguir gestionando sus finanzas de manera eficiente. 
Renueve su suscripción y recupere acceso a todas nuestras características y asistencia especializada. 
Estamos aquí para ayudarle a alcanzar su exito.
<br />
<br />
Saludos cordiales,
El equipo de Villa de Tecneo
             </p>
            </div>
            <div className="btn btn-info">
                <p>Quiero pagar la subscripcion</p>

            </div>
            

            </div>
        </div>
    )
}