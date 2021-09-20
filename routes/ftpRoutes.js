const ftp = require('./ftpclient')
const express = require('express');
const { response } = require('express');

const router = express.Router();

router.get('/test', (req, res) => {
    res.send("success")
});

router.post('/rootDirectory', (req, res) => {
    const host = req.body.connectionDetails.host;
    const port = req.body.connectionDetails.port;
    const username = req.body.connectionDetails.username;
    const password = req.body.connectionDetails.password;

    console.log('root directory host: ' + host);
    const rootclient = new ftp(host, 2121, username, password, false)

    rootclient.rootFolder().then((result) => {
        res.send(result);
    }).catch(err => {
        throw new Error("Error: " + err)
    });

})

router.post('/changePath', (req, res) => {
    const host = req.body.connectionDetails.host;
    const port = req.body.connectionDetails.port;
    const username = req.body.connectionDetails.username;
    const password = req.body.connectionDetails.password;

    const client = new ftp(host, 2121, username, password, false)
    console.log('remote path: ', req.body);
    const remotePath = req.body.path;
    client.changePath(remotePath).then(result => {
        res.send(result);
    }).catch(err => {
        throw new Error("Error: " + err);
    });
})

router.post('/createFolder', (req, res) => {
    const host = req.body.connectionDetails.host;
    const port = req.body.connectionDetails.port;
    const username = req.body.connectionDetails.username;
    const password = req.body.connectionDetails.password;

    const client = new ftp(host, 2121, username, password, false)
    const name = req.body.name;
    const path = req.body.path;
    client.createFolder(name, path).then(result => {
        res.send(result);
    }).catch(err => {
        throw new Error("Error: " + err);
    });
})

router.post('/uploadFile', (req, res) => {
    const host = req.body.connectionDetails.host;
    const port = req.body.connectionDetails.port;
    const username = req.body.connectionDetails.username;
    const password = req.body.connectionDetails.password;

    const client = new ftp(host, 2121, username, password, false);
    const fileName = req.body.fileName;
    const localPath = req.body.localPath;
    const remotePath = req.body.remotePath;

    console.log("fileName: " + fileName);
    console.log("localPath: " + localPath);
    console.log("remotePath: " + remotePath);

    client.uploadFile(fileName, localPath, remotePath).then(result => {
        res.send(result);
    }).catch(err => {
        throw new Error("Error: " + err);
    });
})

router.post('/handleDrop', (req, res) => {
    const host = req.body.connectionDetails.host;
    const port = req.body.connectionDetails.port;
    const username = req.body.connectionDetails.username;
    const password = req.body.connectionDetails.password;

    const client = new ftp(host, 2121, username, password, false)

    client.uploadDragFile(req.body).then(result => {
        res.send(result)
    }).catch(err => {
        throw new Error("Error: " + err);
    });
})

router.post('/downloadDirectory', (req, res) => {
    const host = req.body.connectionDetails.host;
    const port = req.body.connectionDetails.port;
    const username = req.body.connectionDetails.username;
    const password = req.body.connectionDetails.password;

    const client = new ftp(host, 2121, username, password, false)
    let path = req.body.path;
    let name = req.body.name;

    // console.log('remotePath router method: ' + remotePath);
    client.downloadDirectory(path, name).then(result => {
        res.send(result)
    }).catch(e => {
        throw new Error("Error: " + err);
    });
})

router.post('/downloadFile', (req, res) => {
    const host = req.body.connectionDetails.host;
    const port = req.body.connectionDetails.port;
    const username = req.body.connectionDetails.username;
    const password = req.body.connectionDetails.password;

    const client = new ftp(host, 2121, username, password, false)
    const name = req.body.name;
    const path = req.body.path;

    client.downloadFile(name, path).then(result => {
        res.send(result)
    }).catch(e => {
        throw new Error("Error: " + err);
    })
})

router.post('/renameFile', (req, res) => {
    const host = req.body.connectionDetails.host;
    const port = req.body.connectionDetails.port;
    const username = req.body.connectionDetails.username;
    const password = req.body.connectionDetails.password;

    const client = new ftp(host, 2121, username, password, false)
    const oldname = req.body.oldName;
    const path = req.body.path;
    const newname = req.body.newName;

    client.renameFile(oldname, newname, path).then(result => {
        res.send(result)
    }).catch(err => {
        throw new Error("Error: " + err);
    });
})

router.post('/deleteFile', (req, res) => {
    const host = req.body.connectionDetails.host;
    const port = req.body.connectionDetails.port;
    const username = req.body.connectionDetails.username;
    const password = req.body.connectionDetails.password;

    const client = new ftp(host, 2121, username, password, false)
    const path = req.body.path;
    const name = req.body.fileName;

    client.deleteFile(path, name).then(result => {
        res.send(result)
    }).catch(e => {
        throw new Error("Error: " + err);
    })
})

router.post('/deleteDir', (req, res) => {
    const host = req.body.connectionDetails.host;
    const port = req.body.connectionDetails.port;
    const username = req.body.connectionDetails.username;
    const password = req.body.connectionDetails.password;

    const client = new ftp(host, 2121, username, password, false)
    const path = req.body.path;
    const name = req.body.fileName;

    client.deleteFolder(path, name).then(result => {
        res.send(result)
    }).catch(e => {
        throw new Error("Error: " + err);
    })
})

module.exports = router;