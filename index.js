const express = require('express');
const morgan = require('morgan')
const routes = require('./routes/api.js')
const mongoose = require('mongoose');
const app = express()

const hostname = '127.0.0.1'
const port = 8000

// Mongo db
// secure the mongodbURI

const mongodbURI = 'mongodb+srv://JayanthSaikiran:PQ4jcne23XSZUCBZ@nowires.8ksyg.mongodb.net/NoWires?retryWrites=true&w=majority'
mongoose.connect('mongodb://localhost/nowires', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// newQRCode.save((error) => {
//     if (error)
//         console.log('Error while saving');
//     else
//         console.log('Data saved');
// })
app.use(morgan('tiny'))

app.use('/', routes)


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});