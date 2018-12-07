var con = require("../config/connect");
module.exports.find=function(where, cb){
    con(function(err, client){
        var db = client.db("james");
        db.collection("user").find(where).toArray(cb);
    });
}
module.exports.insert=function(obj, cb){
    con(function(err, client){
        var db = client.db("james");
        db.collection("user").insert(obj, cb);
    });
}