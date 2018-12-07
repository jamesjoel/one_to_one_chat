var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("express-flash");
var nocache = require("nocache");
var routes = require("./config/routes");

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret : "james"}));
app.use(flash());
app.use(nocache());
var userArr = [];
app.use(function(req, res, next){
    res.locals.session=req.session;
    next();
});




app.use(require("./config/routes")(io));

http.listen(3000, function(){
    console.log("Server Running");
});