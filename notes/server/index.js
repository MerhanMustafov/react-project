const express = require('express')
const mongoose = require('mongoose')
const {PORT, DB_CONNECTION_STRING} = require('./config')
const cors = require('./config/cors')
const userController = require('./controllers/userController')
serverOn()
async function serverOn(){
    try{
        mongoose.connect(DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log(`DB connected ${DB_CONNECTION_STRING}`)
    }catch(err){
        console.log(err.message)
    }
    const app = express()
    app.use(cors())
    app.use('/user', userController)
    app.listen(PORT, () => {console.log(`Server is ON http://localhost:${PORT}`)})
}
