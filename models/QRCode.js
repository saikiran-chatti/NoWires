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
    megAvailable: Number,
    totalSize: Number,
    usedSpace: Number
})

//model
const QRCodeModel = mongoose.model('QRCode', QRCodeSchema)


module.exports = QRCodeModel;