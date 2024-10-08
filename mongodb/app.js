const express = require("express");
const app = express();
const {  ObjectId } = require("mongodb");

app.set("view engine", "ejs"); 
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url)

const bodyparser= require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }));
const db = client.db("neha");
 const collection = db.collection("exam");
 client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error", err);
   });


var editdatas = null;
var data = null;

app.get("/", async (req, res) => {
  data = await collection.find().toArray();
  console.log(data);

  res.render("index", { data, editdatas });
});

app.post("/create", async (req, res) => {
  if (editdatas) {
    await collection.updateOne(
      { _id: new ObjectId(editdatas._id) },
      { $set: req.body }
    );
    editdatas = null;
  } else {
    await collection.insertOne(req.body);
  }
  res.redirect("/");
});

app.get("/deleteData", async (req, res) => {
  await collection.deleteOne({ _id: new ObjectId(req.query.id) });
  res.redirect("/");
});

app.get("/updateData", async (req, res) => {
  editdatas = await collection.findOne({ _id: new ObjectId(req.query.id) });
  res.render("index", { data, editdatas });
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
             


















