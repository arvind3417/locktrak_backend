const express = require("express")
const actions = require("../methods/actions")
const router = express.Router()

router.get('/',(req,res) =>{
    res.send("hello world")
})
router.get('/dashboard',(req,res) =>{
    res.send("hello world")
})
router.post('/adduser',actions.addNew)
router.post('/auth',actions.authenticate)
router.get("/getinfo",actions.getinfo)
module.exports=router 