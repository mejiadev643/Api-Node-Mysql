var express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
//app.use(express.json());
const port = 3000;

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'articulodb'
});

connection.connect(function (error, results, fields) {
	if (error) {
		throw error;
		console.log('The solution is: ', results[0].solution);
	} else {
		console.log("conexion exitosa");
	}
});


app.get("/", function (req, res) {
	//console.log(req)
	console.log(req.query.message);
	res.send("Ruta inicio");
});
//todos los articulos
app.get("/api/articulos", (req, res) => {
	connection.query('select * from articulos', (error, results, fields) => {
		if (error) {
			throw error;
			console.log('The solution is: ', results[0].solution);
		} else {
			//res.status(200).send();
			res.send(results);
		}
	});
});
//articulos por id
app.get("/api/articulos/:id", (req, res) => {
	connection.query('select * from articulos where id = ?', (req.params.id), (error, results, fields) => {
		if (error) {
			throw error;
			console.log('The solution is: ', results[0].solution);
		} else {
			//res.status(200).send();
			//res.send(results);
			res.send(results[0].descripcion);
		}
	});
});

// crear un articulo

app.post('/api/articulos', (req, res) => {
	let data = { descripcion: req.body.descripcion, precio: req.body.precio, stock: req.body.stock };
	let sql = "INSERT INTO articulos SET ?";
	connection.query(sql, data, function (error, results) {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});
});
// Manejar la solicitud POST en la ruta '/ruta-ejemplo'
app.post('/ruta-ejemplo', (req, res) => {
	// El cuerpo de la solicitud estará disponible en req.body
	const datosRecibidos = req.body;
  
	// Hacer algo con los datos recibidos, por ejemplo, imprimirlos en la consola
	console.log('Datos recibidos:', datosRecibidos);
  
	// Responder a la solicitud con un mensaje
	res.send('Solicitud POST recibida correctamente');
  });

app.post("/", function (req, res) {
	console.log(req.body);
	res.send("se hizo post");
})

app.put('/api/articulos/:id',(req,res)=>{
	console.log(req.params);
	
	let id = req.params.id;
	let descripcion = req.body.descripcion;
	let precio = req.body.precio;
	let stock = req.body.stock;
	let sql= "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
	
	connection.query(sql,[descripcion,precio,stock,id],function(error,results){
		if (error) {
			console.log( error);
		} else {
			//connection.end();
			res.send(results);
		}
	});
	
});




// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`);
});



