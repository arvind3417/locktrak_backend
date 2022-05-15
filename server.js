const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/db")
const bodyparser = require("body-parser")
const passport = require("passport")

const routes = require("./routes/index")

connectDB()

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}
app.use(cors())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(routes);
app.use(passport.initialize()) 
require('./config/passport')(passport)
const PORT = process.env.PORT || 3000
app.listen(PORT,console.log(`server on ${PORT}`))