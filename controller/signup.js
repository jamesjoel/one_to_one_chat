var express = require("express");
var routes = express.Router();
var user = require("../model/user");

module.exports=function(io){

   
    routes.post("/", function(req, res){
        user.insert(req.body, function(err, result){
            req.flash("msgSuccess", "Successful Registration, Please Login to Continue !");
            res.redirect("/");
        });
    });

    return routes;
}


// module.exports = routes;