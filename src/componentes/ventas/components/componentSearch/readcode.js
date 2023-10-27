import Quagga from "quagga"; 

export const readingCode = () => {
   const video = document.querySelector("#video");
   Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: video,
    },
    decoder: {
      readers: ["ean_reader"] // Especifica el tipo de códigos de barras que deseas leer (en este caso, EAN)
    },
  }, function(err) {
    if (err) {
      console.error("Error al iniciar Quagga: ", err);
      return;
    }
    Quagga.start();
  });
  
  Quagga.onDetected(function(result) {
    console.log("Código de barras detectado: ", result.codeResult.code);
    document.getElementById("resultado").textContent = result.codeResult.code;
    if (result.codeResult.code) {
      Quagga.stop();
      Quagga.offProcessed();
    }
  });
  
};
