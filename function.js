let figura = document.getElementById("figura");

let mensaje = document.getElementById("mensaje");
let tituloMensaje = document.getElementById("titulo-mensaje");
let infoMensaje = document.getElementById("info-mensaje");

let botonCopiar = document.getElementById("boton-copiar");

let textoEntrante = document.getElementById("texto-entrante");
let valorTextoEntrante = "";
let textoSaliente = document.getElementById("texto-saliente");

/*Obtiene el texto entrante*/
textoEntrante.addEventListener("input", function () {
  valorTextoEntrante = textoEntrante.value;
});

function condicionesIniciales() {
  figura.style.display = "block";
  mensaje.style.display = "block";
  tituloMensaje.textContent = "Ningún mensaje fue encontrado";
  infoMensaje.textContent = "Ingresa el texto que desees encriptar o desencriptar.";
  textoSaliente.style.display = "none";
  botonCopiar.style.display = "none";
}

/*Funcion para verificar el textarea*/
 function verificarEntrada() {
    if (textoEntrante.value === "") {
        condicionesIniciales();
     }
}

/*Obtiene el contenido del texto entrante - Verifica si está vacío*/
textoEntrante.addEventListener("input", verificarEntrada);


/*Claves propuestas de encriptación*/
let claves = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

/*Función para la encriptación*/
function encriptar() {
  /*Verifica si el texto es apto para encriptar*/
  /*Si el texto contiene Mayúsculas o Caracteres Especiales, no debe encriptarlo*/
    let regExp = /^[a-z ]+$/g;
        if (!regExp.test(valorTextoEntrante)) {
            tituloMensaje.textContent = "Mensaje no aceptado";
            infoMensaje.textContent ="Recuerda que solo se aceptan letras minúsculas y sin acentos";
        return;
}

  /*Si pasa la verificación, oculta y muestra los elementos del área*/
    figura.style.display = "none";
    mensaje.style.display = "none";
    textoSaliente.style.display = "block";
    botonCopiar.style.display = "flex";


  /*Encriptación*/
  /*Busca las coincidencias de la expresión regular y las reemplaza por los valores de las propiedades del objeto "claves"*/
    let textoCifrado = valorTextoEntrante.replace(/[aeiou]/g, function(vocal) {
    return claves[vocal];
  });

  textoSaliente.value = textoCifrado;
}


/*Función para el desencriptado*/
function desencriptar() {
  // Verifica si el texto es apto para encriptar.
  // Si el texto contiene mayúsculas o caracteres especiales, no lo encripta.
    let regExp = /^[a-z ]+$/g;
        if (!regExp.test(valorTextoEntrante)) {
            tituloMensaje.textContent = "Mensaje no aceptado";
            infoMensaje.textContent ="Recuerda que solo se aceptan letras minúsculas y sin acentos";
        return;
}

/*Si pasa la verificación, oculta y muestra los elementos del área*/
  figura.style.display = "none";
  mensaje.style.display = "none";
  textoSaliente.style.display = "block";
  botonCopiar.style.display = "flex";


/*Desencriptado*/
/*Busca las coincidencias de la expresión regular y las reemplaza, compara los valores de las propiedades del objeto "claves" y si son iguales, las reemplaza por el nombre de la propiedad*/
  let textoCifrado = valorTextoEntrante.replace(/(ai|enter|imes|ober|ufat)/g, function(clave) {
    for (let vocal in claves) {
      if (claves[vocal] === clave) {
        return vocal;
    }
  }
});

textoSaliente.value = textoCifrado;
}

/*Función de copiar*/
  function copiar() {

    navigator.clipboard.writeText(textoSaliente.value);
}