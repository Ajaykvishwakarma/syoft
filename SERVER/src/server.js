const express = require('express')
const cors = require('cors')

const mongoConnector = require('./configs/db')


const { register, login } = require('./controllers/user.controller')
const productController  = require('./controllers/product.controller');

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 7000


app.use('/signup', register)
app.use('/signin', login)
app.use('/', productController)


module.exports = ()=>{
    app.listen(port, async ()=>{
        try {
            await mongoConnector()
            console.log(`Server is listening on the port ${port} `)    
        } catch (error) {
            console.log({
                message : error.message,
                status : "something goes wrong"
            })
        }
    })
}