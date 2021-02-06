const express = require('express')
const QRCode = require('qrcode')
const QRCodeModel = require('../models/QRCode')
const router = express.Router();

// Routes
router.get('/generateQRImage', (req, res) => {
    QRCode.toDataURL('Add border radius to QR Code, It looks like shit !!!').then(url => {
        res.send(url)
    }).catch(err => {
        console.log(err);
    })
});

router.post('/createQRDoc', (req, res) => {
    console.log('Body', req.body);
    const data = req.body;
    const dataInstance = new QRCodeModel(data)
    dataInstance.save(error => {
        if (error)
            res.statusCode(500).json({
                msg: 'Internal server error'
            })
        else {
            res.json({
                msg: 'Data saved successfully'
            })
        }
    })
})

router.get('/fetchUniqueId', (req, res) => {
    console.log('fetchUnique');
    console.log(req.body);
    QRCodeModel.find({ uniq_id: req.body.uniq_id })
        .then((data) => {
            console.log('reached then');
            console.log(data);
            res.send(data)
        })
        .catch((error) => {
            console.log(error);
        })
})

router.get('/saveData', (req, res) => {
    const data = {
        url: "api url"
    }

    const dataInstance = new QRCodeModel(data);
    dataInstance.save(error => {
        if (error)
            res.send('Error found')
        else
            res.send('Data saved successfully')
    })
})



router.get('/fetchData', (req, res) => {

    QRCodeModel.find({})
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((error) => {
            console.log(error);
        })
})


module.exports = router;