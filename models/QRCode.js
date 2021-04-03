const { json } = require('body-parser');
const mongoose = require('mongoose')

// MongoDB schemas
const Schema = mongoose.Schema;
const QRCodeSchema = new Schema({
    uniq_id: String,
    host: String,
    port: String,
    username: String,
    password: String,
    secure: Boolean,
    megAvailable: String,
    totalSize: String,
    usedSpace: String
})

//model
const QRCodeModel = mongoose.model('QRCode', QRCodeSchema)


module.exports = QRCodeModel;