//para administradores, ESTA CAMBIADO LO DE GET SELECTED PALABRA
async function borrarPalabra() {
    
    let data = {
        palabra: document.getElementById("input-palabra").value
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
        nombre:  document.getElementById("input-palabra").value
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
        palabra: document.getElementById("input-palabra").value

        
    }

    let result = await fetch("http://localhost:4000/AgregarPalabras", {
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
    let select = document.getElementById("select");
    select.innerHTML = "";
    let result = await fetch("http://localhost:4000/Palabras", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    let palabras = await result.json();
    /*for (let i = 0; i < palabras.length; i++) {
        select += `
            <option value=${palabras[i].palabra}></option>
        `
    }*/

    for (let i = 0; i < palabras.length; i++) {
            let option = document.createElement("option");
            option.value = palabras[i].palabra;
            option.textContent = palabras[i].palabra;
            select.appendChild(option);
    }

}


//cargar jugador, falta vincular con html y eso
async function cargarJugador() {
    let id=3
    let data = {
        nombre_usuario: ui.getNombreRegistro(),
        contraseña: ui.getContraseñaRegistro(),
    }
    console.log(data)
    let result = await fetch("http://localhost:4000/Registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    
    let respuesta = await result.json();
    if (respuesta.registro == true) {
        window.location.href = "index3.html";
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
        if (respuesta.admin === true){
            window.location.href = "admin.html"
        } else {
            window.location.href = "index3.html";
        }
        
    } else {
        alert(respuesta.res)
    }
}

//funcion del juego en si

let palabra = "";
let letrasAdivinadas = [];
let intentos = 6;

async function obtenerPalabra() {
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

