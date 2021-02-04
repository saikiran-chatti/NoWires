const express = require('express');
const morgan = require('morgan')
// const router = module.exports = express.Router()
const mongoose = require('mongoose')
const app = express()
const QRCode = require('qrcode')

const hostname = '127.0.0.1'
const port = 8000

// Mongo db
// secure the mongodbURI
console.log('triggered');

const mongodbURI = 'mongodb+srv://JayanthSaikiran:PQ4jcne23XSZUCBZ@nowires.8ksyg.mongodb.net/NoWires?retryWrites=true&w=majority'
mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
})

// MongoDB schemas
const Schema = mongoose.Schema;
const QRCodeSchema = new Schema({
    url: String,
    date: {
        type: String,
        default: Date.now()
    }
})

//model
const QRCodeModel = mongoose.model('QRCode', QRCodeSchema)


//saving data
const data = {
    url: "Testing the url field"
}

const newQRCode = new QRCodeModel(data)
newQRCode.save((error) => {
    if (error)
        console.log('Error while saving');
    else
        console.log('Data saved');
})

app.use(morgan('tiny'))

// Routes
app.get('/test', (req, res) => {
    QRCode.toDataURL('Jayanth Saikiran').then(url => {
        res.send(`
        <h2>QRCode Generated</h2>
        <div><img src='${url}'/></div>
      `)
    }).catch(err => {
        console.debug(err)
    })
});

app.get('/api', (req, res) => {
    const data = {
        url: "apiurl"
    }
})

app.get('/', (req, res) => {
    res.status(200).send('Hello World!\n');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});