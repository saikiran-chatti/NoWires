const express = require('express');
const morgan = require('morgan')
const routes = require('./routes/api.js')
const ftpRoutes = require('./routes/ftpRoutes.js')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser');
const hostname = '127.0.0.1'
const port = process.env.PORT || 8000

// Mongo db
// secure the mongodbURI

const mongodbURI = 'mongodb+srv://JayanthSaikiran:PQ4jcne23XSZUCBZ@nowires.8ksyg.mongodb.net/NoWires?retryWrites=true&w=majority'
const localDb = 'mongodb://localhost/nowires'
mongoose.connect(process.env.MONGODB_URI || mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
})

// app.use(express.json())
app.use(bodyParser.json({ limit: "5000mb" }))
app.use(bodyParser.urlencoded({ limit: "5000mb", extended: true, parameterLimit: 50000 }))

app.use(express.urlencoded({ extended: false }))

app.use(morgan('tiny'))

app.use('/', routes)
app.use('/', ftpRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.listen(port, () => {
    console.log(`Server running at ${port}/`);
});