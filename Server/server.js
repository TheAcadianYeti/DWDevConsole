var express = require("express");
var app = express();//Main thing the server will be running on
var morgan = require("morgan");//Los requests to the console
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.use(express.static(".."));
app.use(morgan('dev'));//Causes requests to be logged
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(methodOverride());


app.get("JSON/check.json", function(req, res)
{
	res.sendFile("/JSON/check.json");
});
//Defining the get requests
app.get('*', function(req, res)
{
	//Its because of the other get
	res.sendFile('./index.html');
	
});


//Post requests
app.post("/JSON/check.json", function (req, res)
{
	//console.log(req.body);
	console.log(req.params);
});



//Start listening
app.listen(+process.argv[2] || 8080);
console.log("Listening on port " + (+process.argv[2] || 8080));


