const express = require('express')
const QRCode = require('qrcode')
const QRCodeModel = require('../models/QRCode')
const router = express.Router();

// Routes
router.get('/test', (req, res) => {
    QRCode.toDataURL('Jayanth Saikiran').then(url => {
        res.send(`
        <h2>QRCode Generated</h2>
        <div><img src='${url}'/></div>
      `)
    }).catch(err => {
        console.debug(err)
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

router.get('/', (req, res) => {
    res.status(200).send('Hello World!\n');
});

module.exports = router;