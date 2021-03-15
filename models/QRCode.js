const { json } = require('body-parser');
const mongoose = require('mongoose')

// MongoDB schemas
const Schema = mongoose.Schema;
const QRCodeSchema = new Schema({
    uniq_id: String,
    data: JSON
})

//model
const QRCodeModel = mongoose.model('QRCode', QRCodeSchema)


module.exports = QRCodeModel;