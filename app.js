// juego de adivinar el numero

// 1. Generar un numero aleatorio entre 1 y 100
// 2. Pedir al usuario que introduzca un numero
// 3. Comprobar si el numero es correcto
// 4. Si es correcto, mostrar un mensaje de felicitaciones
// 5. Si no es correcto, volver al paso 2

let intentos = 1;
let vidas = 3;
let inputCaja = document.getElementById('pedir');
let numeroMax = 10;
let listaNumeros = [];
let random;

inputCaja.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        verificarIntento();
    }
});

let asignarElemento = (elemento, texto) => {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
}

let numeroAleatorio = () => {
    if (listaNumeros.length === numeroMax) {
        asignarElemento('h1', 'Se han agotado los numeros, espere a que el juego se reinicie');
        inputCaja.setAttribute('disabled', true);
        listaNumeros = [];
        setTimeout(() => {
            nuevoJuego();
        }, 4000);
        return null;
    } else {
        let numAleatorio;
        do {
            numAleatorio = Math.floor(Math.random() * numeroMax) + 1;
        } while (listaNumeros.includes(numAleatorio));
        listaNumeros.push(numAleatorio);
        asignarElemento('p', `Introduce un numero entre 1 y ${numeroMax}`);
        return numAleatorio;
    }
}


let limpiarCaja = () => {
    inputCaja.value = '';
    return;
}

let verificarVidas = () => {
    asignarElemento('h1', 'Se han agotado las vidas, espere a que el juego se reinicie');
    asignarElemento('p', `El numero era ${random}`);
    inputCaja.setAttribute('disabled', true);
    setTimeout(() => {
        nuevoJuego();
    }, 2000);
    return;

}

let verificarIntento = () => {
    let numero = parseInt(inputCaja.value);

    if (numero > 10 || numero < 1) {
        asignarElemento('h1', 'El numero debe estar entre 1 y 10');
        inputCaja.setAttribute('disabled', true);
        return;
    }

    if (vidas > 0) {
        if (numero === random) {
            asignarElemento('p', `Felicidades, has ganado en ${intentos} ${(intentos == 1) ? 'intento' : 'intentos'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            inputCaja.setAttribute('disabled', true);
        } else {
            if (numero > random) {
                asignarElemento('p', 'El numero es menor');
            } else {
                asignarElemento('p', 'El numero es mayor');
            }
            vidas--;
            asignarElemento('h1', `Vidas: ${vidas}`);
            limpiarCaja();
            inputCaja.focus();
            intentos++;

            if (vidas <= 0) {
                verificarVidas();
            }
        }
    }
    return;
}

let condicionInicial = () => {
    intentos = 1;
    random = numeroAleatorio();
    vidas = 3;
    asignarElemento('h1', 'Adivina el numero');
    document.getElementById('reiniciar').setAttribute('disabled', true);
    inputCaja.removeAttribute('disabled');
    limpiarCaja();
    inputCaja.focus();
}

let nuevoJuego = () => {
    condicionInicial();
    return;
}

condicionInicial();
