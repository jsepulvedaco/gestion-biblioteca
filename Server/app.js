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
function leerArchivo (archivo) {
    return new Promise(function(resolve, reject) {
        fs.readFile(archivo, (err, data) => {

            if (err) {
                reject(err);
            }
            //console.log("data de " + archivo, data);
            //let informacion = JSON.parse(data);
            resolve(JSON.parse(data));
            

        });
    });
}

function varificarExistenciaArchivo (archivo) {
    return new Promise(function(resolve, reject) {
        fs.readdir('../Server', (err, archivos) => {
            if (err) reject(err);

            resolve(archivos.indexOf(archivo) > -1);
        });
    });
}


function escribirArchivo (archivo, data) {
    //console.log("escribir archivo recibe", archivo, data)
    return new Promise(function(resolve, reject) {
        fs.writeFile(archivo, JSON.stringify(data), (err) => {

            if (err) {
                console.log("error dentro de writeFile")
                reject(err);
            }
            
            //console.log("escribirArchivo: esto fue lo que escribí", data)
            resolve(data);
        });
    });
}



app.get('/prestarLibro', (req, res) => {
    /*
    verificar primero que el usuario pueda pedir prestados libros
    y que el libro en cuestión no esté presetado
    */

    let usuario;
    let usuarios = [];
    let libros = [];
    let libro;
    let registros = [];
    let registro;

    leerArchivo('usuarios.json')
    .then(users => {
        usuarios = users;
        usuario = users.find((u) => {
            return u.id === 6; //req.body.id
        });
        return leerArchivo('libros.json');
    })
    .then((books) => {
        libros = books;
        libro = books.find((b) => {
            return b.id === 6;
        });
        
        //console.log("1")

        return varificarExistenciaArchivo('registros.json');
    })
    .then(existeRegistros => {
        console.log("verificar", existeRegistros)
        if (!existeRegistros) {
            return escribirArchivo('registros.json', '[]')
        } else {
            return leerArchivo('registros.json');
        }

    })
    .then( (regs)=> {
        
        registros = regs;

        registro = {
            "libro": libro.titulo,
            "autor": libro.autor,
            "referencia": libro.referencia,
            "usuarioNombre": usuario.nombre,
            "usuarioApellido": usuario.apellido,
            "usuarioCodigo": usuario.codigo,
            "fechaPrestamo": { "prestamo": Date.now(), "devolucion": null},
            "fechaEntregado": null,
            "multa" : 0
        };
        //console.log(libro, usuario)
        
        libro.estado = 2;
        usuario.permiso = false;
        
        let indiceUsuario = usuarios.findIndex((usuario) => {
            //console.log("usuario.codigo", usuario.codigo);
            return usuario.id === 6;
        });

        let indiceLibro = libros.findIndex((usuario) => {
            //console.log("usuario.codigo", usuario.codigo);
            return usuario.id === 6;
        });
        
        usuarios.splice(indiceUsuario, 1, usuario);
        libros.splice(indiceLibro, 1, libro);
        registros.push(registro);

        
        //console.log(libro)
        //res.status(200).send(registros);
        
        return Promise.all([
            escribirArchivo('usuarios.json', usuarios),
            escribirArchivo('libros.json', libros),
            escribirArchivo('registros.json', registros)])
        .then( (p)=> {
            //res.status(200).send(registros);
            return p
        });

    })
    .then ((p)=> {
        res.status(200).send(registros);
        //console.log("promise", p)
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
