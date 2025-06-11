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

//get Jugadores
app.get('/Jugadores', async function(req, res){
   try {
     let respuesta;
     if (req.query.id != undefined) {
         respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE nombre_usuario=${req.query.nombre_usuario}`)
     } else {
         respuesta = await realizarQuery("SELECT * FROM Jugadores");
     }
     res.status(200).send({
         message: 'Aca estan los Jugadores',
         animales: respuesta
    });
   } catch (e) {
        console.log(e);
        res.send("Hubo un error, " + e)
        
   }
});

//get Palabras
app.get('/Palabras', async function(req, res){
   try {
     let respuesta;
     if (req.query.palabra != undefined) {
         respuesta = await realizarQuery(`SELECT * FROM Palabras WHERE palabra=${req.query.palabra}`)
     } else {
         respuesta = await realizarQuery("SELECT * FROM Palabras");
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
 


//post Palabras 
app.post('/Palabras', async function(req,res) {
    console.log(req.body) 
    let respuesta;
    if (req.body.palabra != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Palabras WHERE palabra=${req.body.palabra}`)
        console.log(respuesta)
        if (respuesta.length != 0) 
            console.log("Esta palabra ya existe")
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



//post Jugadores 
app.post('/Jugadores', async function(req,res) {
    console.log(req.body) 
    let respuesta;
    if (req.body.nombre_usuario != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE nombre_usuario=${req.body.nombre_usuario}`)
        console.log(respuesta)
        if (respuesta.length != 0) 
            console.log("Este usuario ya existe")
        else{
           await realizarQuery(`
            INSERT INTO Jugadores (nombre_usuario, contraseña) VALUES
            (${req.body.nombre_usuario},"${req.body.contraseña}");
        `)
        res.send("Jugador registrado")
    }
    } else {
        res.send("Falta nombre de usuario")

    }    

})

//put jugadores/palabras???por las dudas los hago
app.put('/Jugadores', async function(req,res) {
    console.log(req.body)
    let respuesta;
    if (req.body.nombre_usuario != undefined){
        respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE nombre_usuario=${req.body.nombre_usuario}`)
        console.log(respuesta)
        if (respuesta.length != 0){
            realizarQuery(`
                UPDATE Jugadores 
                nombre_usuario="${req.body.nombre_usuario}", contraseña="${req.body.contraseña}", partidas_jugadas=${req.body.partidas_jugadas}, partidas_ganadas=${req.body.partidas_ganadas},  partidas_perdidas=${req.body.partidas_perdidas}, puntos=${req.body.puntos}, administrador=${req.body.administrador});
                WHERE nombre_usuario=${req.body.nombre_usuario}
           `)    
            res.send("Jugador actualizado")
            }
            else{
                   
        res.send("El jugador no existe")
        }
        
        
    }else {
        res.send("Falta nombre de usuario ")
    }
   
})
//put palabras
app.put('/Jugadores', async function(req,res) {
    console.log(req.body)
    let respuesta;
    if (req.body.palabra != undefined){
        respuesta = await realizarQuery(`SELECT * FROM Palabras WHERE palabra=${req.body.palabra}`)
        console.log(respuesta)
        if (respuesta.length != 0){
            realizarQuery(`
                UPDATE Palabras 
                SET  palabra=${req.body.palabra}
                WHERE palabra=${req.body.palabra}
           `)    
            res.send("Palabra actualizada")
            }
            else{
                   
        res.send("La palabra no esta en la base de datos")
        }
        
        
    }else {
        res.send("Falta palabra ")
    }
   
})
//delete jugadores
app.delete('/Jugadores', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    DELETE FROM Jugadores WHERE nombre_usuario=${req.body.nombre_usuario}  
    
    `)
    res.send("Usuario eliminado")
})

//delete palabras
app.delete('/Palabras', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    DELETE FROM Palabras WHERE palabra=${req.body.palabra}  
    
    `)
    res.send("Usuario eliminado")
})

