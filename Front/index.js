//borrar palabra 
//hacer funcion de selected palabra


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

  


     /* const loginTab = document.getElementById('btn-login');
      
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
      });*/

