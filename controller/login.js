var express = require("express");
var routes = express.Router();
var user = require("../model/user");

module.exports=function(io){

    routes.get("/", function(req, res){
        var pagedata = { title : "Home Page", pagename : "login/index", msg :  req.flash("msg"), msgSuccess : req.flash("msgSuccess")};
        res.render("layout", pagedata);
    });
    routes.post("/", function(req, res){
        user.find({ username : req.body.username}, function(err, result){
            if(result.length!=0){
                if(result[0].password == req.body.password){
                    console.log("success");
                    req.session.username = result[0].username;
                    req.session._id = result[0]._id;
                    req.session.is_user_logged_in = true;
                    res.redirect("/user");
                }else{
                    req.flash("msg", "Password is not Correct !");
                    res.redirect("/");    
                }
            }else{
                req.flash("msg", "Username and Password is not Correct !");
                res.redirect("/");
            }
        });
    });

    return routes;
}


// module.exports = routes;