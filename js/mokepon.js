const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra');
const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const inputHipodoge = document.getElementById('hipodoge');
const inputCapipepo = document.getElementById('capipepo');
const inputRatigueya = document.getElementById('ratigueya');
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador =  document.getElementById('vidas-jugador');
const spanVidasEnemigo =  document.getElementById('vidas-enemigo');

const sectionMensaje = document.getElementById('resultado');
const ataquesJugador = document.getElementById('ataque-jugador');
const ataquesEnemigo = document.getElementById('ataque-enemigo');

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);
    botonReiniciar.addEventListener('click', reiniciarJuego);
    botonReiniciar.style.display = 'none';
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya';
    } else {
        mensaje();
    }
    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1,3);

    if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge';
    } else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo';
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya';
    }
}

function ataqueFuego() {
    ataqueJugador = 'Fuego';
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = 'Agua';
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = 'Tierra';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3);

    if (ataqueAleatorio ==  1) {
      ataqueEnemigo = "Fuego";
    } else if (ataqueAleatorio ==  2) {
        ataqueEnemigo = "Agua";
    } else {
        ataqueEnemigo = "Tierra";
    }
    combate();
}

function combate() {
    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje("Empate");
    } else if (ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra') {
        crearMensaje("Ganaste");
        vidasEnemigo = vidasEnemigo - 1;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego') {
        crearMensaje("Ganaste");
        vidasEnemigo = vidasEnemigo - 1;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua') {
        crearMensaje("Ganaste");
        vidasEnemigo = vidasEnemigo - 1;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    }else {
        crearMensaje("Perdiste");
        vidasJugador = vidasJugador - 1;
        spanVidasJugador.innerHTML = vidasJugador;
    }
    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("Felicitaciones! Ganaste");
    } else if (vidasJugador == 0) {
        crearMensajeFinal("Lo siento, Perdiste");
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement('p'); 
    let nuevoAtaqueEnemigo = document.createElement('p'); 
    sectionMensaje.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;
    ataquesJugador.appendChild(nuevoAtaqueJugador);
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensaje.innerHTML = resultadoFinal;
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    botonReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const mensaje = () => {
    Swal.fire({
        title: "Lo siento 😐", 
        text: "Debes elegir una opción", 
        type: "error",
        showConfirmButton: false,
        timer: 1500,
        backdrop: 'rgba(255, 5, 5, 0.45)',
        padding: '2rem'
    })
    .then(() => {
        reiniciarJuego();
    }); 
}

window.addEventListener('load', iniciarJuego);


