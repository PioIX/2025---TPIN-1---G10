class UserInterface{
    constructor(){

    }  
    getNombre(){
        return document.getElementById("username").value
    }
    getSelectedPalabra(){
        return document.getElementById("input-palabra").value
    }
    getContraseña(){
        return document.getElementById("password").value
    }

    getNombreRegistro(){
        return document.getElementById("new-username").value
    }

    getContraseñaRegistro(){
        return document.getElementById("new-password").value
    }
}

const ui = new UserInterface();


