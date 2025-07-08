//para administradores
async function borrarPalabra() {
    
    let data = {
        palabra: getSelectedPalabra()
    }

    try {
        let result = await fetch(`http://localhost:4000/Palabras`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        console.log(result)
        let respuesta = await result.json();
        console.log(respuesta)

    } catch (e) {
        console.log("Hubo un error")
    }
}
 

//para administradores
async function borrarJugador() {
    
    let data = {
        nombre: getNombre()
    }

    try {
        let result = await fetch(`http://localhost:4000/Jugadores`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        console.log(result)
        let respuesta = await result.json();
        console.log(respuesta)

    } catch (e) {
        console.log("Hubo un error")
    }
}

//para administradores
async function agregarPalabra() {
    let data = {
        palabra: getPalabra(),
        
    }

    let result = await fetch("http://localhost:4000/Palabras", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    console.log(result)
    let respuesta = await result.json();
    console.log(respuesta)
}

async function llenarSelect() {
    let select = document.getElementById("select").innerHTML;
    let result = await fetch("http://localhost:4000/Palabras", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    let palabras = await result.json();
    for (let i = 0; i < palabras.length; i++) {
        select += `
            <option value=${palabras[i].palabra}></option>
        `
    }
    document.getElementById("select").innerHTML = select;
}


//cargar jugador, falta vincular con html y eso
async function cargarJugador() {
    let id=3
    let data = {
        nombre_usuario: ui.getNombre(),
        contraseña: ui.getContraseña(),
        partidas_jugadas: 0,
        partidas_ganadas: 0,
        partidas_perdidas: 0,
        puntos: 0,
        id:id++,
        administrador: false
    }
    
    let result = await fetch("http://localhost:4000/Registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    
    let respuesta = await result.json();
    if (respuesta.registro == true) {
        window.location.href = "index4.html";
    } else {
        window.alert(respuesta.res);

    }
    
}
//no se si hay q usarla o la hice al pedo
async function administrador() {
    
     let result = await fetch("http://localhost:4000/Administrador?administrador=true", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    console.log(result)
    let respuesta = await result.json();
    console.log(respuesta)
    window.location.href = "admin.html";
    
    

}





async function loginJugador() {
    const nombre = ui.getNombre();
    const contraseña = ui.getContraseña();

    let data = {
        nombre_usuario: nombre,
        contraseña: contraseña,
    }

    let result = await fetch("http://localhost:4000/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    console.log(result)
    let respuesta = await result.json();

    if (respuesta.loguea == true) {
        if (respuesta.administrador == true){
            window.location.href = "admin.html"
        } else {
            window.location.href = "index4.html";
        }
        
    } else {
        alert(respuesta.res)
    }
}

//funcion del juego en si

let palabra = "";
let letrasAdivinadas = [];
let intentos = 6;

window.onload = async function () {
    await obtenerPalabra();
};

async function obtenerPalabra() {
    let palabra = "";
    let letrasAdivinadas = [];
    let intentos = 6;

    window.onload = async function () {
        await obtenerPalabra();
    };

    try {
        let res = await fetch('/PalabraAleatoria');
        let data = await res.json();
        palabra = data.palabra.toLowerCase();
        letrasAdivinadas = Array(palabra.length).fill('_');
        mostrarGuiones();
        document.getElementById('intentos').textContent = `Intentos restantes: ${intentos}`;
    } catch (e) {
        console.error("Error al obtener la palabra:", e);
    }
}

function mostrarGuiones() {
    document.getElementById('guiones').textContent = letrasAdivinadas.join(' ');
}

function adivinarLetra() {
    let letraInput = document.getElementById('LetraInput');
    let letra = letraInput.value.toLowerCase();

    if (!letra || letra.length !== 1 || !letra.match(/[a-zñ]/)) {
        alert("Ingresá una sola letra válida");
        return;
    }

    if (palabra.includes(letra)) {
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) {
                letrasAdivinadas[i] = letra;
            }
        }
    } else {
        intentos--;
    }

    mostrarGuiones();
    document.getElementById('intentos').textContent = `Intentos restantes: ${intentos}`;
    letraInput.value = "";

    verificarJuego();
}

function verificarJuego() {
    if (!letrasAdivinadas.includes('_')) {
        window.location.href = "index4.html";
        desactivarJuego();
    } else if (intentos === 0) {
        window.location.href = "index4.html";
        desactivarJuego();
    }
}

function desactivarJuego() {
    document.getElementById('letra-input').disabled = true;
}

const loginTab = document.getElementById('btn-login');
   
const registerTab = document.getElementById('btn-register');
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
loginTab.addEventListener('click', () => {
    // Activar pestaña y sección de login
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginSection.classList.add('active');
    registerSection.classList.remove('active');
});

registerTab.addEventListener('click', () => {
    // Activar pestaña y sección de registro
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerSection.classList.add('active');
    loginSection.classList.remove('active');
});