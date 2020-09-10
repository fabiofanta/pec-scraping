"use strict";
exports.__esModule = true;
exports.mongoDB = void 0;
// import dependencies
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL Database Name Database Collection
var dbConfig = require('../../assets/js/dbInput');
var Database = /** @class */ (function () {
    function Database(dbUrl, dbName, collection) {
        this.dbUrl = dbUrl;
        this.dbName = dbName;
        this.collection = collection;
    }
    Database.prototype.insertDocuments = function (payload) {
        var self = this;
        MongoClient.connect(self.dbUrl, { useUnifiedTopology: true }, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            var db = client.db(self.dbName);
            var collection = db.collection(self.collection);
            collection.insertOne(payload, function (err, result) {
                if (err)
                    throw err;
                console.log("Inserted to DB");
                client.close();
            });
        });
    };
    return Database;
}());
var mongoDB = new Database(dbConfig.url, dbConfig.dbName, dbConfig.collection);
exports.mongoDB = mongoDB;
