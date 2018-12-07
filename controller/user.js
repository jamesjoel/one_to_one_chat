var express = require("express");
var routes = express.Router();
var counter=0;
var users = {};
var request, response;
module.exports=function(io){
	routes.get("/", getData, function (req, res) {
	    var pagedata = { title: "User Page", pagename: "user/index"};
	    res.render("layout", pagedata);
	});
	io.on("connection", function(socket){
		
		users[request.session.username]=socket.id;		
		io.emit("onlineUser", users); 
		socket.on("send", function(data){
			io.to(users[data.to]).emit("throw", { from : data.from, msg : data.msg });
		});  
 
	});
 	return routes; 
}
function getData(req, res, next){
	request = req;
	response = res;
	next();
}
