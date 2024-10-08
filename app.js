const express = require("express");
const app = express();
app.set("view engine", "ejs"); 
const bodyparser= require('body-parser')
const mongoose = require('mongoose');
const friend=require('./mongoos/model/friend')
app.use(bodyparser.urlencoded({ extended: true }));

 client
  .connect()
  .then(() => {
    console.log("Connected to Mongoos");
  })
  .catch((err) => {
    console.error("Connection error", err);
   });
var data = null;

app.get("/",(req, res) => {

  

  res.render('index');
});



app.listen(3000, () => {
  console.log("server is running on port 3000");
});
             


















