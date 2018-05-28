// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{

	if(err){

		//return - just to make sure rest of code wont execute
		return console.log('Unable to connect MongoDB server');

	}

	console.log('Connected to MongoDB server');

	db.collection('Users').find({

		name : 'Hari'


	}).toArray().then((docs)=>{

		console.log("Todos");

		console.log(JSON.stringify(docs,undefined,2))


	},(err)=>{

		console.log('Unable to fetch Todos',err)

	});


	// db.collection('Todos').find().count().then((count)=>{

	// 	console.log(`Todos count: ${count}`);

	// },(err)=>{

	// 	console.log('Unable to fetch Todos',err)

	// });

	//db.close();

});