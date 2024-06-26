const express = require('express')
const QRCode = require('qrcode')
const QRCodeModel = require('../models/QRCode')
const router = express.Router();
const { v1: uuidv1 } = require('uuid');

const randomIdGenerator = () => {
    return uuidv1();
}


// Routes
router.get('/generateQRImage', (req, res) => {

    let randomStr = randomIdGenerator()
    console.log(randomStr);
    QRCode.toDataURL(randomStr).then(url => {
        res.send({ url: url, data: randomStr }) // can remove url from json.
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
            //async 
            res.json({
                msg: 'Data saved successfully'
            })
        }
    })
})

router.post('/deleteDoc', (req, res) => {

    QRCodeModel.find({ uniq_id: req.body.uniq_id }, (err, docs) => {
        if (docs.length == 0) {
            res.send({ "message": "No docs found" });
        }
        else {
            console.log(docs[0]);
            QRCodeModel.deleteOne({ _id: docs[0]._id }, (error, mongooseDeleteResult) => {

                if (mongooseDeleteResult.ok === 1) {
                    console.log('Deleted Successfully');
                    res.send(docs[0]);
                }
                else {
                    console.log('reached catch block');
                    res.send({ "message": "Error while deleting document" });
                }
            })
        }
    })
})

module.exports = router;