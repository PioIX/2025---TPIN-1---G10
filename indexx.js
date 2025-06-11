//borrar palabra 
//hacer funcion de selected palabra

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
//cargar jugador, falta vincular con html y eso
async function cargarJugador() {

    let data = {
        nombre: getNombre(),
        contraseña: getContraseña(),
    }

    let result = await fetch("http://localhost:4000/Jugadores", {
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
