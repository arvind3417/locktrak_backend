var User = require("../models/user")
var jwt = require("jwt-simple")
var config = require("../config/dbconfig")

var functions = {
    addNew : function(req,res){
        if((!req.body.email) || (!req.body.password)){
            res.json({success : false , msg : "Enter all fields"})
        }
        else{
            var newUser = User({
                email: req.body.email,
                password: req.body.password
            })
            newUser.save(function(err,newUser){
                if(err){
                    res.json({success:false,msg:"failed to save"})
                    // console.log(err)
                }
                else{
                    res.json({success:true,msg:"save successful"})
                }
            })
        }
    },
    authenticate: function(req,res){
        User.findOne({
            email:req.body.email
        },
        function(err,user){
            if(err) throw err
            if(!user){
                res.status(403).send({success:false,msg:"auth failed"})
            }
            else{
                user.comparePassword(req.body.password,function(err,isMatch){
                    if(isMatch&&!err){
                        var token = jwt.encode(user,config.secret)
                        res.json({success:true,token:token})
                    }
                    else{
                        return res.status(403).send({success:false,msg:"auth failed wrong pass"})
                    }
                })
            }
        })

    },
    getinfo: function(req,res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken= jwt.decode(token,config.secret)
            return res.json({
                success:true,
                msg:"hello " + decodedtoken.email
            })
            
        }else{
            return res.json({
                success:false,
                msg:"no headers"
            })
        }
    }
}
module.exports = functions