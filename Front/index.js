//para administradores, ESTA CAMBIADO LO DE GET SELECTED PALABRA
async function borrarPalabra() {
    
    let data = {
        palabra: document.getElementById("input-palabra").value
    }

    try {
        let result = await fetch(`http://localhost:4000/BorrarPalabra`, {
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
 

//para administradores. NO ANDA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
async function borrarJugador() {
    
    let data = {
        nombre_usuario:  document.getElementById("input-nombre-jugador").value
    }

    try {
        let result = await fetch(`http://localhost:4000/BorrarJugador`, {
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
async function AgregarPalabras() {
    let data = {
        palabra: document.getElementById("input-palabra-agregar").value

        
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
/* no lo uso
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
   

    for (let i = 0; i < palabras.length; i++) {
            let option = document.createElement("option");
            option.value = palabras[i].palabra;
            option.textContent = palabras[i].palabra;
            select.appendChild(option);
    }

}*/

//cargar jugador, registro
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
        localStorage.setItem("nombre_usuario",ui.getNombreRegistro()); 
        window.location.href = "index3.html";
    } else {
        window.alert(respuesta.res);

    }
    
}


//login
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
        localStorage.setItem("nombre_usuario",nombre); 
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
        let res = await fetch('http://localhost:4000/PalabraAleatoria');
        let data = await res.json();
        console.log(data)
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

function actualizarImagenAhorcado() {
    const img = document.getElementById("imagen-ahorcado");
    let imagenIndex = 6 - intentos; // Si quedan 5 intentos → imagen 1
    img.src = `images/ahorcado${imagenIndex}.png`;
}  

let letrasUsadas = [];

function adivinarLetra() {
    let letraInput = document.getElementById('letra-input');
    let letra = letraInput.value.toLowerCase();

    if (!letra || letra.length !== 1 || !letra.match(/[a-zñ]/i)) {
        alert("Ingresá una sola letra válida");
        return;
    }
    if (letrasUsadas.includes(letra)) {
      alert("Ya usaste esa letra");
      return;
    }

    letrasUsadas.push(letra);
    document.getElementById("letras_utilizadas").textContent = letrasUsadas.join(", ");


    function quitarTildes(cadena) {
        return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    let letraSinTilde = quitarTildes(letra);
    let palabraSinTildes = quitarTildes(palabra.toLowerCase());

    if (palabraSinTildes.includes(letraSinTilde)) {
        for (let i = 0; i < palabra.length; i++) {
            if (quitarTildes(palabra[i].toLowerCase()) === letraSinTilde) {
                letrasAdivinadas[i] = palabra[i]; 
            }
        }
    } else {
        actualizarImagenAhorcado();
        intentos--;
       
    }

    mostrarGuiones();
    document.getElementById('intentos').textContent = `Intentos restantes: ${intentos}`;
    letraInput.value = "";

    verificarJuego();
}





async function verificarJuego() {
    if (!letrasAdivinadas.includes('_')) {
        await registrarResultado("ganada", palabra.length); 
        window.location.href = "index4.html";
        
        desactivarJuego();
    } else if (intentos === 0) {
        await registrarResultado("perdida", 0); 
        window.location.href = "index5.html";
        desactivarJuego();
    }
}

async function registrarResultado(resultado, puntos) {
    try {
        let nombre_usuario = localStorage.getItem("nombre_usuario"); 

        const data = {
            nombre_usuario,
            resultado,
            puntos
        };

        let res = await fetch("http://localhost:4000/ActualizarEstadisticas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        let response = await res.json()
        console.log(response)
    } catch (error) {
        console.error("Error al registrar estadísticas:", error);
    }
}

async function cargarRanking() {
    try {
        const res = await fetch("http://localhost:4000/Ranking");
        const data = await res.json();
        const ranking = data.ranking;
        const cuerpo = document.getElementById("cuerpo-ranking");

        cuerpo.innerHTML = ""; 
        ranking.forEach((jugador, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${jugador.nombre_usuario}</td>
                <td>${jugador.puntos}</td>
                <td>${jugador.partidas_jugadas}</td>
                <td>${jugador.partidas_ganadas}</td>
                <td>${jugador.partidas_perdidas}</td>
            `;
            cuerpo.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar el ranking:", error);
    }
}




function desactivarJuego() {
    document.getElementById('letra-input').disabled = true;
}

