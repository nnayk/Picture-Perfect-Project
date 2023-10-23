/* ----------------------------------------
	wrapper for database 
---------------------------------------- */


const { MongoClient } = require('mongodb');

const config = require('config');


// Will be swtiching between local and deployed system
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

// Constants for simulation library
const dbName = 'dbPicturePerfect';
const collectionUsers = 'usersCollection';
const collectionImages = 'imagesCollection';

