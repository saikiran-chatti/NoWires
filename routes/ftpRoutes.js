const ftp = require('./ftpclient')
const express = require('express')
const router = express.Router();


router.get('/parentList', (req, res) => {
    const client = new ftp('192.168.0.5', 2232, 'android', 'android')

    client.parentList().then((result) => {
        res.send(result);
    });

})

module.exports = router;