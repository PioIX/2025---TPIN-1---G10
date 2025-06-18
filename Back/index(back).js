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
         message: 'Aca estan los jugadores filtrados por genero o autor',
         animales: respuesta
    });
   } catch (e) {
        console.log(e);
        res.send("Hubo un error, " + e)
        
   }
});
//post animales
app.post('/Libros', async function(req,res) {
    console.log(req.body) 
    let respuesta;
    if (req.body.id != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Libros WHERE id=${req.body.id}`)
        console.log(respuesta)
        if (respuesta.length != 0) 
            console.log("Ese libro ya existe")
        else{
           await realizarQuery(`
            INSERT INTO Libros (id,nombre,autor,año_de_publicacion,genero,cantidad_de_paginas,breve_decripcion ) VALUES
            (${req.body.id},"${req.body.nombre}","${req.body.autor}",${req.body.año_de_publicacion},"${req.body.genero}",${req.body.cantidad_de_paginas},"${req.body.breve_descripcion}" );
        `)
        res.send("Libro agregado")
    }
    } else {
        res.send("Falta id")

    }    

})
//get libros 2.0
app.get('/Libros', async function(req, res){
    try {
      let respuesta;
      if (req.query.año1 != undefined && req.query.año2 != undefined ) {
          respuesta = await realizarQuery(`SELECT * FROM Libros WHERE año_de_publicacion BETWEEN ${req.query.año1} and ${req.query.año2}`)
      } else {
          respuesta = await realizarQuery("SELECT * FROM Libros");
      }
      res.status(200).send({
          message: 'Aca estan los libros filtrados entre '  + req.query.año1 + 'y '  +   req.query.año2 ,
          libros: respuesta
     });
    } catch (e) {
         console.log(e);
         res.send("Hubo un error, " + e)
         
    }
 });





app.get('/Jugadores', async function(req, res){
    let respuesta;
    if (req.query.nombre != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE nombre=${req.query.nombre}`)
    } else {
        respuesta = await realizarQuery("SELECT * FROM Jugadores");
    }
    res.status(200).send(respuesta);
});
app.get('/Estadios', async function(req, res){
    let respuesta;
    if (req.query.nombre != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Estadios WHERE nombre=${req.query.nombre}`)
    } else {
        respuesta = await realizarQuery("SELECT * FROM Estadios");
    }
    res.status(200).send(respuesta);
});
app.get('/Clubes', async function(req, res){
    let respuesta;
    if (req.query.nombre != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Clubes WHERE nombre=${req.query.nombre} `)
    } else {
        respuesta = await realizarQuery("SELECT * FROM Clubes");
    }
    res.status(200).send(respuesta);
});
//post
app.post('/Clubes', async function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    let respuesta;
    if (req.body.id != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Clubes WHERE id=${req.body.id}`)
        console.log(respuesta)
        if (respuesta.length != 0) 
            console.log("Ese club ya existe")
        else{
          await  realizarQuery(`
            INSERT INTO Clubes (id,id_estadio,nombre,fecha_inaguracion) VALUES
            (${req.body.id},${req.body.id_estadio},"${req.body.nombre}","${req.body.fecha_inaguracion}");
        `)
        res.send({mensaje: "Club agregado"})
    }
    } else {
        res.send({mensaje:"Falta id"})

    }    
  
})
app.post('/Jugadores', async function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    let respuesta;
    if (req.body.dni != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE dni=${req.body.dni}`)
        console.log(respuesta)
        if (respuesta.length != 0) 
            console.log("Ese jugador ya existe")
        else{
           await realizarQuery(`
            INSERT INTO Jugadores (dni,nombre,apellido,id_club) VALUES
            (${req.body.dni},"${req.body.nombre}","${req.body.apellido}",${req.body.id_club});
        `)
        res.send("Jugador agregado")
    }
    } else {
        res.send("Falta dni")

    }    

})


app.post('/Estadios',async function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    //No poner comilla en las columnas,si en los datos
    let respuesta;
    if (req.body.id != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Estadios WHERE id=${req.body.id}`)
        console.log(respuesta)
        if (respuesta.length != 0) 
            console.log("Ese estadio ya existe")
        else{
            realizarQuery(` 
            INSERT INTO Estadios (id,nombre,direccion,capacidad) VALUES
            (${req.body.id},"${req.body.nombre}","${req.body.direccion}",${req.body.capacidad});
        `)
        res.send({res: "Estadio agregado"})
    }
} else {
    res.send("Falta id")

}    

})
//put
app.put('/Estadios', async function(req,res) {
    console.log(req.body)
    let respuesta;
    //El if para ver si ya existen va en el post y no en el put
    if (req.body.id != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Estadios WHERE id=${req.body.id}`)
        //res.send(respuesta);
        console.log(respuesta)
        if (respuesta.length != 0){
            realizarQuery(`
                UPDATE Estadios 
                SET capacidad=${req.body.capacidad}
                WHERE id=${req.body.id}
                
            `)
            res.send({mensaje: "Estadio actualizado"})
            }
            else{
        res.send({mensaje: "El estadio no existe"})
        
        }
        
    } else {
        res.send({mensaje:"Falta id"})
    }    
})

app.put('/Jugadores', async function(req,res) {
    console.log(req.body)
    let respuesta;
    if (req.body.dni != undefined){
        respuesta = await realizarQuery(`SELECT * FROM Jugadores WHERE dni=${req.body.dni}`)
        console.log(respuesta)
        if (respuesta.length != 0){
            realizarQuery(`
                UPDATE Jugadores 
                SET  dni=${req.body.dni}, nombre="${req.body.nombre}", apellido="${req.body.apellido}", id_club=${req.body.id_club});
                WHERE dni=${req.body.dni}
           `)    
            res.send("Jugador actualizado")
            }
            else{
                   
        res.send("El jugador no existe")
        }
        
        
    }else {
        res.send("Falta id ")
    }
   
})

app.put('/Clubes', async function(req,res) {
    console.log(req.body)
    let respuesta;
    if (req.body.dni != undefined){
        respuesta = await realizarQuery(`SELECT * FROM Clubes WHERE id=${req.body.id}`)
        console.log(respuesta)
        if (respuesta.length != 0){
            realizarQuery(`
                UPDATE Clubes 
                SET  id=${req.body.id}, id_estadio=${req.body.id_estadio}, nombre="${req.body.nombre}", fecha_inaguracion=${req.body.fecha_inaguracion});
                WHERE id=${req.body.id}
                       
            `)
            res.send("Club actualizado")
            }
            else{
        console.log("El club no existe")
        res.send("El club no existe")
        }
        
        
    }else {
        res.send("Falta id")
    }
    
})
//delete
app.delete('/Clubes', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    DELETE FROM Clubes WHERE id=${req.body.id}  
    
    `)
    res.send("Club eliminado")
})
app.delete('/Jugadores', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    DELETE FROM Jugadores WHERE dni=${req.body.dni}  
    
    `)
    res.send({mensaje: "Jugador eliminado"})
})
app.delete('/Estadios', function(req,res) {
    console.log(req.body)
    realizarQuery(`
    DELETE FROM Estadios WHERE id=${req.body.id}  
    
    `)
    res.send({mensaje: "Estadio eliminado"})
})




//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});