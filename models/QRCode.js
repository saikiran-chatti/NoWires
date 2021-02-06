const mongoose = require('mongoose')

// MongoDB schemas
const Schema = mongoose.Schema;
const QRCodeSchema = new Schema({
    uniq_id: String,
    date: {
        type: String,
        default: Date.now()
    }
})

//model
const QRCodeModel = mongoose.model('QRCode', QRCodeSchema)


module.exports = QRCodeModel;