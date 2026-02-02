const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { shorten_url, get_original_url } = require("./url_management");

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});


// App API calls, can be put in different module for better management But as this server is running for personal use I am writing here itsel

app.post("/shorten",(req,res)=>{
    shorten_url(req.body)
    .then(short_url=>{
        res.status(200).send({short_url:`http://127.0.0.1:3000/${short_url}`})
    })
    .catch(err_msg=>{
        res.status(400).send({msg:err_msg});
    })
})


app.get("/:shortId",(req,res)=>{
    const { shortId } = req.params;
    get_original_url(shortId)
    .then(orginal_url=>{
        return res.redirect(301, orginal_url);
    })
    .catch(err_msg=>{
        res.status(404).json({error: err_msg});
    })
})


app.listen((3000),()=>{
    console.log("Server is listening on port 3000")
})

