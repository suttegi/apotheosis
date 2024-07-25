import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import fileUpload from 'express-fileupload'

const app = express()
dotenv.config()

//constants 
const port = process.env.PORT
const dbname = process.env.DB_NAME
const dbpassword = process.env.DB_PASSWORD
const dbuser = process.env.DB_USER

//MiddleWare
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)


async function start(){
    try {
        await mongoose.connect(`mongodb+srv://${dbuser}:${dbpassword}@cluster0.xgvos93.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("mongodb connected")
        app.listen(port,()=>console.log(`meow ${port}`))
    } catch (error) {
        console.log(error)
    }

}
start()
