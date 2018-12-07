var express = require("express");
var routes = express.Router();

module.exports=function(io){
	routes.use("/", require("../controller/login")(io));
	routes.use("/signup", require("../controller/signup")(io));
	routes.use("/user", backdoor, require("../controller/user")(io));
	routes.get("/logout", function(req, res){
		req.session.destroy();
		res.redirect("/"); 
	});


	
	
	return routes;
}

function backdoor(req, res, next){
    if (!req.session.is_user_logged_in){
        res.redirect("/");
        return;
    }
    next();
}


// module.exports=routes;