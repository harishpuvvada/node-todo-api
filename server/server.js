var express =  require('express');
var bodyParser = require('body-parser'); //json to Object
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose'); //for mongoose config
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); //middleware 

app.post('/todos',(req,res)=>{

	var todo = new Todo({
		text : req.body.text
	})

	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e); //setting status before sending error
	});

});


app.get('/todos', (req,res)=>{

	Todo.find().then((todos)=>{

		res.send({
			todos
		});

	},(e)=>{

		res.status(400).send(e);

	});


});


app.get('/todos/:id', (req,res)=>{

	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	
	Todo.findById(id).then((todo)=>{
		
		if(!todo){
			return res.status(404).send();
		}
		
		res.status(200).send({todo});

	}).catch((e) => {

		return res.status(400).send();

	});


});


app.listen(port,()=>{
	console.log(`Started on at ${port}`);
})

module.exports = {app}; //for test files

// ./mongod --dbpath ~/mongo-data