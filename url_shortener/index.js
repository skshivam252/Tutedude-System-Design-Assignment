const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});


app.listen((3000),()=>{
    console.log("Server is listening on port 3000")
})

