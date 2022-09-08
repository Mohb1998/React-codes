//This is a database using the mongodb driver
//it is better to use mongoose

const {
    MongoClient
} = require("mongodb");
const assert = require("assert");

// Replace the uri string with your MongoDB deployment's connection string.
const url = "mongodb://localhost:27017";

const dbName = "fruitsDB";

const client = new MongoClient(url, {
    useNewUrlParser: true
});

client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    //Waits until the data has been inserted before closing the client
    // insertDocuments(db,function() {
    //     client.close();
    // });

    //This will find and print the data in your database
    findDocuments(db, function() {
        client.close();
      });
});

const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');

    // Insert some documents
    collection.insertMany([{
            name: "Apple",
            rating: 10,
            review: "Very fresh"
        },
        {
            name: "Banana",
            rating: 9,
            review: "Very good"
        },
        {
            name: "Orange",
            rating: 8,
            review: "Very nice"
        }

        //Validation to check that there are no errors
        //and checks that there are 3 new documents added
    ], function (err, result) {
        assert.equal(err, null);

        //These 2 lines have been depricated
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);

        //and substitued by :
        assert.equal(3,result.insertedCount);
        assert.equal(3,Object.keys(result.insertedIds).length);

        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(fruits)
      callback(fruits);
    });
  }