"use strict";

const fs = require('fs');
const path = require('path');
// grab express
const express = require('express');
const bodyParser = require("body-parser");
// create an express app
const app = express();
// create an express route for the home page
// http://localhost:8080/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/libros', function (req, res, next) {
    console.log("request para libros")
    res.sendFile(__dirname + '/' + 'libros.json');
});

app.post('/agregarLibro', (req,res) => {
    console.log('->', req.body);
    let libros;
    
    fs.readFile('libros.json',  (err, data) => {
        
        if (err) throw err;

        libros = JSON.parse(data);
        console.log(libros);

        let indice = libros.findIndex((libro) => {
            
            console.log("libro.referencia", libro.referencia);
            return libro.referencia === req.body.referencia;
        });

        if (indice !== -1)
            return res.status(409).send('el libro ya existe en el inventario');

        let id = libros[libros.length - 1].id;
        console.log("id", id);

        let libro = {
    		"id": id + 1,
    		"titulo": req.body.titulo,
    		"autor": req.body.autor,
    		"referencia": req.body.referencia,
    		"estado": 1
    	};

        libros.push(libro);

        fs.writeFile('libros.json', JSON.stringify(libros), (err) => {
            
            if (err) throw err;
            console.log('libro agregado');
            res.send(libros);
        });
    });
});

function obtenerLibros() {
    fs.readFile('libros.json', (err, libros) => {
        if (err) throw err;

        return libros;
    });
}

app.put('/editarLibro', (req, res) => {
    console.log("editar", req.body);


    fs.readFile('libros.json',  (err, data) => {
        if (err) throw err;

        let libros = JSON.parse(data);
        let indice = libros.findIndex((libro) => {
            //console.log("libro.id", libro.id);
            return libro.id === req.body.id;
        });

        if (indice === -1) {
            res.status(404).send('Libro no encontrado');
        }

        let libro = req.body;

        console.log("libro a guardar",libro)
        
        libros.splice(indice, 1, libro);


        fs.writeFile('libros.json', JSON.stringify(libros), (err) => {
            if (err) throw err;
            console.log('libro editado');
            res.send(libros);
        });

    });

    
});


app.post('/borrarLibro', (req, res) => {
    console.log('->', req.body);
    let libros;
    fs.readFile('libros.json',  (err, data) => {
        if (err) throw err;

        libros = JSON.parse(data);
        console.log(libros);

        let indice = libros.findIndex((libro) => {
            console.log("libro.referencia", libro.referencia);
            return libro.referencia === req.body.referencia;
        });

        if (indice === -1)
            return res.status(404).send('Libro no encontrado');

        libros.splice(indice, 1);

        fs.writeFile('libros.json', JSON.stringify(libros), (err) => {
            if (err) throw err;
            console.log('libro agregado');
            res.send(libros);
        });
    });
});

// -----------------------------------------------------------------------//

app.get('/usuarios', (req, res) => {
    res.sendFile(__dirname + '/' + 'usuarios.json');
});


app.post('/agregarUsuario', (req,res) => {
    console.log('->', req.body);

    /* validación */

    // expresiones regulares

    let usuarios;
    fs.readFile('usuarios.json',  (err, data) => {
        
        if (err) throw err;

        usuarios = JSON.parse(data);
        console.log(usuarios);

        let indice = usuarios.findIndex((usuario) => {
            console.log("usuario.codigo", usuario.codigo);
            return usuario.codigo === req.body.codigo;
        });

        if (indice !== -1)
            return res.status(409).send('ya hay un usuario registrado con ese código');

        let id = usuarios[usuarios.length - 1].id;
        console.log("id", id);

        let usuario = {
            "id": id + 1,
            "nombre": req.body.nombre,
            "apellido": req.body.apellido,
            "codigo": req.body.codigo,
            "permiso": true,
            "administrador": false
        };

        usuarios.push(usuario);

        fs.writeFile('usuarios.json', JSON.stringify(usuarios), (err) => {
            
            if (err) throw err;
            
            console.log('usuario agregado');
            res.send(usuarios);
        });
    });
});

app.post('/borrarUsuario', (req, res) => {
    console.log('->', req.body);
    let usuarios;
    fs.readFile('usuarios.json',  (err, data) => {
        
        if (err) throw err;

        usuarios = JSON.parse(data);
        console.log(usuarios);

        let indice = usuarios.findIndex((usuario) => {
            console.log("usuario.codigo", usuario.codigo);
            return usuario.codigo === req.body.codigo;
        });

        if (indice === -1)
            return res.status(404).send('usuario no encontrado');

        usuarios.splice(indice, 1);

        fs.writeFile('usuarios.json', JSON.stringify(usuarios), (err) => {
            
            if (err) throw err;
            
            console.log('usuario agregado');
            res.send(usuarios);
        });
    });
});


app.put('/editarUsuario', (req, res) => {
    console.log("editar", req.body);


    fs.readFile('usuarios.json',  (err, data) => {
        if (err) throw err;

        let usuarios = JSON.parse(data);
        let indice = usuarios.findIndex((usuario) => {
            //console.log("usuario.id", usuario.id);
            return usuario.id === req.body.id;
        });

        if (indice === -1) {
            res.status(404).send('Usuario no encontrado');
        }

        let usuario = req.body;

        console.log("usuario a guardar",usuario)
        
        usuarios.splice(indice, 1, usuario);


        fs.writeFile('usuarios.json', JSON.stringify(usuarios), (err) => {
            if (err) throw err;
            console.log('usuario editado');
            res.send(usuarios);
        });

    });

    
});

/* ------------------------------------------------------------------ */
function leerArchivo (filename){
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, (err, data) => {

            if(err) reject(err);
            
            console.log(data)
            let informacion = JSON.parse(data);
            resolve(informacion);
        });
    });
}


function escribirArchivo (filename, data){
    return new Promise(function(resolve, reject) {
        fs.writeFile(filename, JSON.stringify(data), (err) => {

            if(err) reject(err);
            
            resolve('éxito');
        });
    });
}

let usuarios = [];
let usuario;
let libros = [];
let libro;
let registros = [];
let registro;

app.get('/prestarLibro', (req, res) => {

    leerArchivo('usuarios.json')
    .then(users => {


        
        usuarios = users;
        return leerArchivo('libros.json');
    })
    .then((books) => {
         
        //console.log(books)
        libros = books;
        
        usuario = usuarios.find((user) => {
            return user.id === 5;
        });

        libro = libros.find((book) => {
            return book.id === 5;
        });

        if (usuario === undefined || libro === undefined)
            res.status(400).send("hubo un error al procesar el préstamo");

        registro = {
            "libro": libro,
            "usuario": usuario,
            "fechaPrestamo": Date.now()
        };
        console.log("1")
        return fs.open('registro.json');
    })
    .then(exists => {
        console.log("2", exists)

        registros.push(registro);
        return "hola"
    })
    .then(respuesta => {
        res.status(200).send('préstamo realizado')
    })
    .catch( err => {
        console.log("hubo un error", err);
        res.status(500).send('error');
    });



});







// start the server on port 8080
app.listen(8080, () => {
    console.log('Server has started!');
});
// send a message
