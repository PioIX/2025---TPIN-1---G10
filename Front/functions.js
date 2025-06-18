const users = [];
users.push(new User("soficracco","0"))
users.push(new User("agusmombe","0"))
users.push(new User("chiaranarducci","0"))
users.push(new User("emadalessandro","0"))

let idLogged = -1
function existeUsuario(username,password){
    for (let i = 0; i < users.length ; i++){
        if (users[i].username == username && users[i].password == password){
            return users[i].id
        } else if(users[i].username == username && users[i].password != password){
            return 0
        }
    }
    return -1
}

function ingresar(){
    let username = ui.getNombre()
    let password = ui.getContraseña()
    let r = existeUsuario(username,password)
    console.log(r)
    if (r>0){
        idLogged = r
        
    }
}