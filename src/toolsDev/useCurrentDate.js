export const CurrentDate= () => {

    function addCero(number){
        if(number <10){
            return number.toString().padStart(2, "0");
        } else {
            return number.toString();
        }

    }

    const currentDate= new Date();

    return `${currentDate.toLocaleDateString()} hora: ${addCero(currentDate.getHours())}: ${addCero(currentDate.getMinutes())}`

}