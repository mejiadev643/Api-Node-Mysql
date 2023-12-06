var express = require('express');
var mysql = require('mysql');

var app = express();


app.get("/", function(req,res){
	res.send("Ruta inicio");
});

const puerto = 3000;  

app.listen(puerto,function(){
console.log("servidor OK en http://localhost:"+ puerto)
});

