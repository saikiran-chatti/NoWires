const ftp = require('./ftpclient')
const express = require('express');
const { response } = require('express');
const router = express.Router();

router.get('/rootDirectory', (req, res) => {
    const rootclient = new ftp('192.168.0.5', 2232, 'android', 'android')

    rootclient.rootFolder().then((result) => {
        res.send(result);
    });

})

router.get('/downloadDirectory', (req, res) => {
    const client = new ftp('192.168.0.5', 2232, 'android', 'android')
    const localPath = "C:/Users/ACER/Desktop/No Wires";
    const remotePath = "/memes"
    client.downloadDirectory(localPath, remotePath)
})

router.post('/changePath', (req, res) => {
    const client = new ftp('192.168.0.5', 2232, 'android', 'android')
    console.log('remote path: ', req.body);
    const remotePath = req.body.path;
    client.changePath(remotePath).then(result => {
        res.send(result);
    });
})

module.exports = router;