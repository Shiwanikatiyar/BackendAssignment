// Import required packages
const express = require("express")
const connection = require('./config/db')
const productRoute = require('./routes/product.route')
const userRoute= require('./routes/user.route')

const app = express()
const PORT = 8585

app.use(express.json())
app.use("/user", userRoute)
app.use("/product", productRoute)

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Server is running on Port ${PORT} and connected to the database`)
        console.log("Connected to Database")
    } catch (error) {
        console.log(`Error conecting to the database or server ${error}`)
    }

})
