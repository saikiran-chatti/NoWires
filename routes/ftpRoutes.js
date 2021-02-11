const ftp = require('./ftpclient')
const express = require('express')
const router = express.Router();


router.get('/parentList', (req, res) => {
    const client = new ftp('192.168.0.4', 2232, 'android', 'android')

    client.parentList().then((result) => {
        res.send(result);
    });

})

router.get('/ftptest', (req, res) => {
    const client = new ftp('192.168.0.4', 2232, 'android', 'android')

    res.send(client.sendListToFile())
})

module.exports = router;