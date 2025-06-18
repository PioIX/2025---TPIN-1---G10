let idUsuario = 1;
// Ejercicio 2
class User{
    constructor(username,password){
        this.id = idUsuario;
        idUsuario++;
        this.username = username;
        this.password = password;
  
    }
}

