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
        window.location.href = "index3.html";
    } else {
        alert(respuesta.res)
    }
    
}

  const nombre = ui.getNombre().trim();
  const contraseña = ui.getContraseña().trim();

  // Filtro rápido: no envío si viene vacío
  if (!nombre || !contraseña) {
    alert("Por favor, completá nombre y contraseña.");
    return;
  }

  const data = { nombre_usuario: nombre, contraseña };

  try {
    console.log("🟢 Enviando a /Login:", data);

    const response = await fetch("http://localhost:4000/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("🔵 Status:", response.status);

    // Si no es 2xx, corto acá
    if (!response.ok) {
      // Opcional: leer texto/JSON de error
      const errText = await response.text();
      console.error("Respuesta no OK:", errText);
      alert(`Error ${response.status}: ${errText}`);
      return;
    }

    // Ahora sí parseo
    const respuesta = await response.json();
    console.log("🟣 JSON:", respuesta);

    if (respuesta.loguea === true) {
      window.location.href = "index3.html";
    } else {
      alert(respuesta.res || "Credenciales incorrectas.");
    }
  } catch (err) {
    // Aquí caen errores de red o de .json()
    console.error("🔥 Error en fetch/login:", err);
    alert("No se pudo conectar con el servidor.");
  }
}*/


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

      