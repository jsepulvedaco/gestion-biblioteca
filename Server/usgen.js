const fs = require('fs');

const nombres = [
	'Pedro', 'Andrés', 'Yuuki', 'Camila', 'Laura', 
];

const apellidos = [
	'Rodriguez', 'Ferreira', 'Medina', 'Ramirez', 'Hernandez'
];

const permisos = [ true, false]

let usuarios = [];

let usuario;

for (let i = 1; i <= 50; i++) {
	usuario = {};
	
	usuario.id = i;
	usuario.nombre = nombres[Math.floor(Math.random() * nombres.length)];
	usuario.apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
	usuario.permiso = permisos[Math.floor(Math.random() * permisos.length)];
	usuario.codigo = 100000 + i;

	if (Math.random() > 0.9) {
		usuario.administrador = true;
	} else {
		usuario.administrador = false;
	}


	usuarios.push(usuario);
}

fs.writeFile('usuarios.json', JSON.stringify(usuarios), (err) => {
    if (err) {
      return console.error(err);
   }
   console.log("Data written successfully!");
});