// import dependencies
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL Database Name Database Collection

const dbConfig = require('../../assets/js/dbInput');


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
        MongoClient.connect(self.dbUrl, {useUnifiedTopology:true},function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(self.dbName);
            const collection = db.collection(self.collection);

            collection.insertOne(payload,function(err, result) {
                if(err) throw err;
                console.log("Inserted to DB");
                client.close();
            })
        })
    }
}

const mongoDB = new Database (dbConfig.url,dbConfig.dbName,dbConfig.collection);


export {mongoDB};
