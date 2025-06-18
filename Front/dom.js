class UserInterface{
    constructor(){

    }  
    getNombre(){
        return document.getElementById("username").value
    }
    getSelectedPalabra(){
        return document.getElementById("palabra").value
    }
    getContraseña(){
        return document.getElementById("password").value
    }
}

const ui = new UserInterface();


