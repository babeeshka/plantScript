const { MongoClient } = require('mongodb');

// Replace with your actual connection string
const uri = "mongodb+srv://babeeshka:IFiD9bgRcQosM8XL@plantscriptcluster.xd7ut6q.mongodb.net";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        // You can perform database operations here if needed
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
