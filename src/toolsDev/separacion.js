export const Separador=(numero)=>{
    const number=numero;
    const numeroSeparado=number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    return numeroSeparado
}