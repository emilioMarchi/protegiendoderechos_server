const express = require('express') 
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path')
require('dotenv').config()
const cors = require('cors');
const connectDb = require('./mongoConnection')

const app = express()
const port = process.env.PORT || 8080
const root = path.join(__dirname, 'build')
app.use(express.static(root))


//
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

let corsOptions = {
    origin: ['https://admin.escuelademusicabarrial.ar',
    'https://www.protegiendoderechos.com.ar','https://protegiendoderechos.com.ar',
    'http://localhost:3000','http://3.83.189.41','http://ec2-3-83-189-41.compute-1.amazonaws.com'], // Reemplazar con dominio
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));


// Conexión a Base de datos
connectDb()

// mdw
const validationToken = require('./mdlw/validationToken')

    
//import routes
const formRoutes = require('./routes/formRoutes')
const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
// routes
app.get('/', (req, res) => {
    res.send('work')
})
app.use('/form', formRoutes )
app.use('/auth', authRoutes )
app.use('/dashboard', validationToken, dashboardRoutes )
// route middlewares

app.listen(port, () => console.log(`App is live on port ${port}!`))