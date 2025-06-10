require('dotenv').config()

//async errors

const express = require('express')
const app = express()
const notFound = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

//middlewares

app.use(express.json())

//routes

app.get('/', (req,res) => {
    res.send('<h1>Store API</h1><a href = "/api/v1/products">Products route</a>')
})

app.use('/api/v1/products', productsRouter)


//products routes

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening at port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()
