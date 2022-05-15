var mongoose = require("mongoose")
var schema = mongoose.Schema;
var bcrypt = require("bcrypt")
var userschema = new schema({
    email:{
type:String,
unique:true,
required:true
    },
    // name: {
    //     type: String,
    //     required: true
    // },
    password: {
        type: String,
        required: true
    }
})
userschema.pre('save',function(next){
    var user = this;
    if(this.isModified('password')||this.isNew){
        bcrypt.genSalt(10,function(err,salt){ 
            if(err){return next(err)}
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err){return next(err)}
                user.password = hash;
                next()
            })
        })
    }
    else{ return next()}
})
userschema.methods.comparePassword = function(passw,cb){
    bcrypt.compare(passw,this.password,function(err,isMatch){
        if(err){return cb(err)}
        cb(null,isMatch)
    })
}
module.exports = mongoose.model('User',userschema)