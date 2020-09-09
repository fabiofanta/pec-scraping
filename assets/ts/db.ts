// import dependencies
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'PECScraping';

// Database Collection
const collection = 'pecEmails';


class Database {

    dbUrl : string;
    dbName : string;
    collection : string;

    constructor(dbUrl:string,dbName:string,collection:string) {
		this.dbUrl = dbUrl;
		this.dbName = dbName;
		this.collection = collection;
	}

    insertDocuments(payload :object) {
        let self = this;
        MongoClient.connect(self.dbUrl, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(self.dbName);
            const collection = db.collection(self.collection);

            collection.insertOne(payload);
            console.log("Inserted to DB");

      	    client.close();
        })
    }
}

const mongoDB = new Database (url,dbName,collection);

export {mongoDB};
