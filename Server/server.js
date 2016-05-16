var express = require("express");
var app = express();//Main thing the server will be running on
var morgan = require("morgan");//Los requests to the console
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var fs = require('fs');
var mailer = require("nodemailer");

app.use(express.static(".."));
app.use(morgan('dev'));//Causes requests to be logged
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(methodOverride());

//Mailing transport
var transporter = mailer.createTransport(
	{
		service: 'Gmail',
		auth: {
			user: 'dwparkingfun@gmail.com',
			pass: 'dwparkingfunyay'
		}
});




app.get("/JSON/check.json", function(req, res)
{
	res.sendFile("/JSON/check.json");
});
//Defining the get requests
app.get('*', function(req, res)
{
	//Its because of the other get
	res.sendFile('./index.html');
	res.header('Access-Control-Allow-Origin', 'https://confluence.deltaware.com/**');
	res.header('Access-Control-Allow-Origin', 'jira.deltaware.com:8080/**');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	
});


app.get("/JSON/profiles.json", function(req, res)
{
	res.sendFile("/JSON/profiles.json");
});

//Post requests
app.post("/JSON/check.json", function (req, res)
{
	if(req.query.postUpdate === "true")
	{
		//Write to check.json
		fs.writeFile(__dirname + "/../JSON/check.json", JSON.stringify(req.body), function(err)
		{
			if(err)
				res.end("Failed to post update");
		});
		
		//Email everyone in a list, for now just pwilliams@upei.ca
		var text = "Cars were just marked!!\n\nSent using not an iphone";
		var mailOptions = {
			from: 'dwparkingfun@gmail.com',
			to: 'pfw143822@gmail.com',
			subject: 'Tires were marked',
			text: text
		};
		console.log("About to send");
		//Here we go
		transporter.sendMail(mailOptions, function(error, data)
		{
			if(error)
			{
				console.log(error);
				res.end("Failed to send");
			}
			else
			{
				console.log(data);
				res.end("Successfully posted update");
			}
		});
		
	}
	else if(req.query.postComment === "true")
	{
		//Write to check.json but just the comment
		//Read the file as a JSON
		console.log("Writing " + __dirname + " to json file");

			//Write to file
			fs.writeFile(__dirname + "/../JSON/check.json", JSON.stringify(req.body), function(err)
			{
				if(err)
					res.end("Failed to post comment");
			});
		res.end("Successfully posted update");
	}

});


//Simple method adds a user into our "database"
//Structure of user will be as follows, for now, 
app.post("/JSON/users.json", function(req, res)
{
	if(req.query.createAccount === "true")
	{
		console.log("Writing " + __dirname + " to json file");
		fs.readFile(__dirname + "/../JSON/users.json", 'utf8', function (err, data) {
			if(err)
				res.end("Failed to read file");
			//Change text to an obj
			var obj = JSON.parse(data);
			//We want to change the values to change the comments and thats it
			var user = req.body;
			console.log(req.body);
			obj.users.push(user);
			//Write to file
			fs.writeFile(__dirname + "/../JSON/users.json", JSON.stringify(obj), function(err)
			{
			if(err)
					res.end("Failed to create account");
			});
		});
		res.end("Successfully posted update");
	}
});



//Start listening
app.listen(+process.argv[2] || 8080);
console.log("Listening on port " + (+process.argv[2] || 8080));


