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
        nombre_usuario: ui.getNombre(),
        contraseña: ui.getContraseña(),
        partidas_jugadas: 0,
        partidas_ganadas: 0,
        partidas_perdidas: 0,
        puntos: 0,
        administrador: false
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



async function loginJugador() {

    let data = {
        nombre_usuario: ui.getNombre(),
        contraseña: ui.getContraseña(),
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
    if (respuesta.res == "Contraseña incorrecta"){
        alert("Vuelva a ingresar la contraseña, es incorrecta.")
    }
    if (respuesta = "Falta ingresar contraseña"){
        alert ("Completa el campo de contraseña, por favor.")
    }
    if (respuesta = "Esta mal el nombre de usuario"){
        if(confirm("Su usuario no existe, registrese")){
            await cargarJugador()
            alert("Usuario registrado correctamente")
        }
        
    }
    if (respuesta = "Falta nombre de usuario"){
        alert ("Completa el campo de nombre de usuario, por favor.")
    }
    
        
    
    console.log(respuesta)
}


