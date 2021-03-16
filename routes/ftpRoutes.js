const ftp = require('./ftpclient')
const express = require('express');
const { response } = require('express');

const router = express.Router();

router.get('/rootDirectory', (req, res) => {
    const rootclient = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')

    rootclient.rootFolder().then((result) => {
        res.send(result);
    });

})

router.post('/changePath', (req, res) => {
    const client = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')
    console.log('remote path: ', req.body);
    const remotePath = req.body.path;
    client.changePath(remotePath).then(result => {
        res.send(result);
    });
})

router.post('/createFolder', (req, res) => {
    const client = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')
    const name = req.body.name;
    const path = req.body.path;
    client.createFolder(name, path).then(result => {
        res.send(result);
    });
})

router.post('/uploadFile', (req, res) => {
    const client = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')
    const file = req.body.file;
    const path = req.body.path;

    client.uploadFile(file, path).then(result => {
        res.send(result)
    })
})

router.post('/handleDrop', (req, res) => {
    const client = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')

    client.uploadDragFile(req.body).then(result => {
        res.send(result)
    })
})

router.post('/downloadDirectory', (req, res) => {
    const client = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')
    let path = req.body.path;
    let name = req.body.name;

    // console.log('remotePath router method: ' + remotePath);
    client.downloadDirectory(path,name).then(result => {
        res.send(result)
    }).catch(e => {
        res.status(400).send("error while downloading");
    })
})

router.post('/downloadFile', (req, res) => {
    const client = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')
    const name = req.body.name;
    const path = req.body.path;

    client.downloadFile(name, path).then(result => {
        res.send(result)
    }).catch(e => {
        res.status(400).send("error while downloading");
    })
})

router.post('/renameFile', (req, res) => {
    const client = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')
    const oldname = req.body.oldname;
    const path = req.body.path;
    const newname = req.body.newname;

    client.renameFile(oldname, newname, path).then(result => {
        res.send(result)
    })
})

router.post('/deleteFile', (req, res) => {
    const client = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')
    const path = req.body.path;
    const name = req.body.fileName;

    client.deleteFile(path, name).then(result => {
        res.send(result)
    }).catch(e => {
        res.status(400).send("Error while Deleting");
    })
})

router.post('/deleteDir', (req, res) => {
    const client = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')
    const path = req.body.path;
    const name = req.body.fileName;

    client.deleteFolder(path, name).then(result => {
        res.send(result)
    }).catch(e => {
        res.status(400).send("Error while Deleting");
    })
})

module.exports = router;