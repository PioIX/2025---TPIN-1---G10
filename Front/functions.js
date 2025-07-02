/*const users = [];
users.push(new User("soficracco","0"))
users.push(new User("agusmombe","0"))
users.push(new User("chiaranarducci","0"))
users.push(new User("emadalessandro","0"))

let idLogged = -1*/
function existeUsuario(username,password){
    /*
    RECIBO NOMBRE Y CONTRASEÑA (HECHO)
    MANDARIA UN FETCH CON ESTOS DATOS, TIPO POST
    EL PEDIDO SE PUEDE LLAMAR /LOGIN
    ESTE PEDIDO DEBERIA VERIFICAR SI ESTE USUARIO Y CONTRASEÑA EXISTEN EN LA BDD
    2 formas de hacerlo: 
        - 1 seria q el pedido traiga todos los usarios de la bdd y despues hacer unfor para verificar
        - 2 directamente hacer un pedido sql q verifique si existe
    */
    for (let i = 0; i < users.length ; i++){
        if (users[i].username == username && users[i].password == password){
            return users[i].id
        } else if(users[i].username == username && users[i].password != password){
            return 0
        }
    }
    return -1
}

function registrarNuevo(mail,name,password){

    for (let i=0; i < users.length ; i++){
        if (users[i].mail == mail) {
            return -1
        }
    }
    users.push(new User(name,mail,password))
    return users[users.length - 1].id
}

/*function ingresar(){
    let username = ui.getNombre()
    let password = ui.getContraseña()
    let r = existeUsuario(username,password)
    console.log(r)
    if (r>0){
        idLogged = r
        
        
    }else{
        if(confirm("Tu usuario aún no existe")){
            registrarNuevo(username,password)
        }
    }
}
*/


function salir(){
  const confirmar = window.confirm("¿Estás seguro que querés salir?");
  if (confirmar) {
   window.location.href = "index.html";
    
  }
}

function verRanking(){
     window.location.href = "ranking.html";
    }

function seguirJugando(){
    window.location.href = "index3.html";
}