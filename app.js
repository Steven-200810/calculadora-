const botones = document.querySelectorAll("button");
const pantalla = document.getElementById("resultado");

function agregarValor(valor){
    if(pantalla.value === "0" && !isNaN(valor)){
        pantalla.value = valor;
    }
    else{
        pantalla.value += valor;
    }
}

function manejarDecimal() {
  const valorActual = resultado.value;

  // split separa la expresión por operadores
  const partes = valorActual.split(/[+\-x÷]/);
  const ultimoNumero = partes[partes.length - 1];

  // Si el último número ya tiene un punto, no deja poner otro
  if (ultimoNumero.includes('.')) return;

  // Si solo hay un 0, entonces agrega "0."
  if (valorActual === '0') {
    resultado.value = '0.';
    return;
  }

  // Agrega el punto normalmente
  pantalla.value = valorActual + '.';
}



function borrarTodo() {
    pantalla.value = "0";
}


function borrar() {
    const valorActual = resultado.value;

  // Si solo hay un caracter, lo reemplaza por 0
  if (valorActual.length === 1) {
    resultado.value = '0';
  } else {
    // slice corta desde el índice 0 hasta el último -1
    resultado.value = valorActual.slice(0, -1);
  }
}


function calcular() {
    try {
        let expresion = pantalla.value.replace("×", "*").replace("÷", "/");


        if (/\/0(?!\.)/.test(expresion)) throw new Error("divCero");

        let resultado = eval(expresion);

        if (isNaN(resultado)) throw new Error("invalida");

        pantalla.value = resultado;

        setTimeout(() => pantalla.value = "0", 2000);
    } catch (error) {
        pantalla.value = "Error";
        setTimeout(() => pantalla.value = "0", 2000);
    }
}

function porcentaje() {
    try {
        let valor = parseFloat(pantalla.value);
        pantalla.value = valor / 100;
    } catch {
        pantalla.value = "Error";
    }
}


botones.forEach(boton => {
    boton.addEventListener("click", () => {

        const valor = boton.textContent;


        if (valor === "C") return borrarTodo();
        if (valor === "⌫") return borrar();
        if (valor === "=") return calcular();
        if (valor === "%") return porcentaje();


        if (pantalla.value === "0" && isNaN(valor) && valor !== ".") {
            alert("El formato usado no es válido!");
            return;
        }

        if (!isNaN(valor) || valor === ".") {
            agregarValor(valor);
        } else {
            pantalla.value += valor;
        }
    });
});