// _________mongodb with mongoose________

//require the Mongoose package (after running >npm i mongoose in Hyper to install it)
const mongoose = require("mongoose");

//connect to MongoDB by specifying port to access MongoDB server
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/FruitsDB");
}

//create a SCHEMA that sets out the fields each document will have and their datatypes
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Please check your data entry, no name specified!",
  },

  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema,
});

//create a MODEL from the SCHEMA
const Fruit = new mongoose.model("Fruit", fruitSchema);
const Person = new mongoose.model("Person", personSchema);
//create a DOCUMENT from the MODEL

const fruit = new Fruit({
  name: "Apple",
  rating: 9,
  review: "Great!",
});

const pineapple = new Fruit({
  name: "pineapple",
  rating: 9,
  review: "Great fruit!",
});

const mango = new Fruit({
  name: "mango",
  rating: 10,
  review: "The best fruit ever!",
});

const person = new Person({
  name: "Zelda",
  age: 25,
  favoriteFruit: pineapple,
});

//save the document (comment it if you don't want to create another Apple)
// fruit.save();
// person.save();
// pineapple.save();
mango.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit!",
});

const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "Too sour for me",
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture",
});

//Add many fruits (comment it if you don' want to add again when node app.js)
// Fruit.insertMany([kiwi, orange, banana], (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

//Find documents from collections
Fruit.find((err, fruits) => {
  fruits.forEach((fruit) => {
    if (err) {
      console.log(err);
    } else {
      console.log(fruit.name);

      // to ctrl + c the console automatically after displaying the fruits
      // mongoose.connection.close();
    }
  });
});

// _____________Update document

// Fruit.updateOne(
//   { _id: "634445981a751c0f6f07f072" },
//   { name: "Peach" },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully updated the document.");
//     }
//   }
// );

Person.updateOne(
  {
    _id: "6345dcf4eb675933869f0ccf",
  },
  { favoriteFruit: mango },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully updated the document.");
    }
  }
);

// _____________Delete document

// Fruit.deleteOne({ name: "Peach" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted!");
//   }
// });

// Person.deleteOne({ _id: "634532fd8d386000e2bc5777" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted!");
//   }
// });

// _________mongodb with native driver (rarely used by developers)________

//const { MongoClient } = require("mongodb");

// Connection URL
// const uri = "mongodb://localhost:27017";

// Database Name
// const dbName = "fruitsDB";

// Create a new MongoClient
// const client = new MongoClient(uri);

// Use connect method to connect to the Server
// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected successfully to server");

//     const db = client.db(dbName);
//     const collection = db.collection("fruits");

//     const docs = [
//       {
//         name: "Apple",
//         score: 8,
//         review: "Great fruit",
//       },
//       {
//         name: "Orange",
//         score: 6,
//         review: "Kinda sour",
//       },
//       {
//         name: "Banana",
//         score: 9,
//         review: "Great stuff!",
//       },
//     ];

//     const result = await collection.insertMany(docs);
//     console.log(
//       "Inserted ${result.insertedCount} documents into the collection."
//     );
//   } finally {
// Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);'}'
