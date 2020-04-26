var express = require("express");
var fs = require("fs";
var url = require("url");
var port = process.env.PORT || 3000;
var app = express();
const __dirname = '/';
app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static(__dirname + '/public'));


app.get("/", function (req, res) {
 res.send(JSON.stringify({ Hello: "World"}));
});

app.post("/writeReview", function(req,res){
    var body = '';
    filePath = __dirname+'/public/data.txt';
    req.on('data', function(data) {
        body+=data;
    })
    request.on('end', function(){
        fs.appendFile(filePath, body, function(){
            res.sendFile(filePath);
        });
    });
});

app.post("/readReviews", function(req,res){
    res.sendFile(filePath);
});

app.listen(port, function () {
 console.log("Example app listening on port !");
});