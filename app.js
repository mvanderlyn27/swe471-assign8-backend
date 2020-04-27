var express = require("express");
var fs = require("fs");
var url = require("url");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var port = process.env.PORT || 3000;
var app = express();
app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(upload.array()); 

app.get("/", function (req, res) {
 res.send(JSON.stringify({ Hello: "World"}));
});

app.post("/writeReview", function(req,res){
    filePath = __dirname+'/public/data.json';
    var num = req.body.number;
    var date = req.body.Date_of_Visit;
    var comments = req.body.Comments;
    var rating = req.body.rating;
    var last_name = req.body.last_name;
    var first_name = req.body.first_name;
    var email = req.body.email;
    var building = req.body.building;
    newEntry = {"number" : num, "date":date, "comments":comments,"rating":rating,"last_name":last_name,"first_name":first_name,"email":email,"building":building};
    fs.readFile(filePath, function (err, data) {
        var json = JSON.parse(data);
        json.entries.push(newEntry);
        fs.writeFile(filePath, JSON.stringify(json), (error)=>{
            if(error){
            console.log('error',error);
            next(error);
        }
        console.log('file saved');
        res.sendFile(filePath);
        });
    });
    
});

app.post("/readReviews", function(req,res){
    filePath = __dirname+'/public/data.json';
    console.log('file read');
    res.sendFile(filePath);
});
app.post("/clearReviews", function(req,res){
    filePath = __dirname+'/public/data.json';
    console.log('file read');
    var json = {"entries":[]};
    fs.writeFile(filePath, JSON.stringify(json), (error)=>{
        if(error){console.log('error clearing files');next(error);}
        console.log('cleared entries');
        res.sendFile(filePath);
    });
    
});

app.listen(port, function () {
 console.log("Example app listening on port "+port+"!");
});