const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

// Capturar el body 
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// Conexión a la Base de Datos
const url = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@dicis.vai3gpu.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conactado a BD'))
  .catch((error) => console.log('Error: ' + error))

// Creación e importación de rutas
const authRoutes = require('./routes/auth')

// Ruta del middleware
app.use('/api/user', authRoutes)


app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: "Funciona chido"
    })
})

// Iniciamos el servidor
const PORT = process.env.PORT || 10000
app.listen(PORT, () => {
    console.log(`Servidor en Puerto: ${PORT}`)
})