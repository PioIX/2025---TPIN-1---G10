var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

//get palabras
app.get('/Palabras', async function(req, res){
   try {
     let respuesta;
     if (req.query.especie != undefined) {
         respuesta = await realizarQuery(`SELECT * FROM Palabras WHERE palabra=${req.query.palabra}`)
     } else {
         respuesta = await realizarQuery("SELECT * FROM Animales");
     }
     res.status(200).send({
         message: 'Aca estan las palabras',
         palabras: respuesta
    });
   } catch (e) {
        console.log(e);
        res.send("Hubo un error, " + e)
        
   }
});

//post palabras(admin) 
app.post('/Palabras', async function(req,res) {
    console.log(req.body) 
    let respuesta;
    if (req.body.palabra != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Palabras WHERE palabra=${req.body.palabra}`)
        console.log(respuesta)
        if (respuesta.length != 0) 
            console.log("Esa palabra ya existe")
        else{
           await realizarQuery(`
            INSERT INTO Palabras (palabra) VALUES
            ("${req.body.palabra}");
        `)
        res.send("Palabra agregada")
    }
    } else {
        res.send("Falta ingresar palabra")

    }    

})


//get tabla jugadores
app.get('/Jugadores', async function(req, res){
   try {
     let respuesta;
     if (req.query.jugador != undefined ) {
         respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE jugadores=${req.query.jugadores}`)
     } else {
         respuesta = await realizarQuery("SELECT * FROM Jugadores");
     }
     res.status(200).send({
         message: 'Aca estan los jugadores',
         animales: respuesta
    });
   } catch (e) {
        console.log(e);
        res.send("Hubo un error, " + e)
        
   }
});

//post jugadores: Se puede usar para nel registrar, no para el login
app.post('/Jugadores', async function(req,res) {
    console.log(req.body) 
    let respuesta;
    if (req.body.nombre_usuario != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE nombre_usuario=${req.body.nombre_usuario}`)
        console.log(respuesta)
        if (respuesta.length != 0) 
            console.log("Ese nombre de usuario ya existe")
        else{
           await realizarQuery(`
            INSERT INTO Jugadores (nombre_usuario ,contraseña , partidas_jugadas, partidas_ganadas, partidas_perdidas, puntos, administrador ) VALUES
            ("${req.body.nombre_usuario}","${req.body.contraseña}",${req.body.partidas_jugadas},${req.body.partidas_ganadas},${req.body.partidas_perdidas},${req.body.puntos},${req.body.administrador} );
        `)
        res.send("Jugador agregado")
    }
    } else {
        res.send("Falta nombre de usuario")

    }    

})

//login
app.post('/Login', async function(req,res) {
    console.log(req.body) 
    let respuesta;
    if (req.body.nombre_usuario != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE nombre_usuario=${req.body.nombre_usuario}`)
        console.log(respuesta)
        if (respuesta.length > 0) {
            if (req.body.contraseña != undefined) {
                respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE contraseña=${req.body.contraseña}`)
                if  (respuesta.length > 0) {
                    console.log(respuesta)
                    res.send({res:"Jugador existe"})
                }
                else{
                    res.send({res:"Contraseña incorrecta"}) 
                }
            }else{
                res.send({res:"Falta ingresar contraseña"})                
            }
        } 
        else{
            res.send({res:"Esta mal el nombre de usuario"})
        }
    
    }else {
        res.send({res:"Falta nombre de usuario"})

    }    

})





//delete jugadores y palabras
app.delete('/Palabras', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    DELETE FROM Palabra WHERE palabra=${req.body.palabra}  
    
    `)
    res.send("Palabra eliminado")
})

app.delete('/Jugadores', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    DELETE FROM Jugadores WHERE nombre_usuario=${req.body.nombre_usuario}  
    
    `)
    res.send({mensaje: "Jugador eliminado"})
})




//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});