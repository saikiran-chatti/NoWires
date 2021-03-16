const ftp = require('./FTPClient')
const express = require('express')
const app = express()

// app.use(express.json())

const client = new ftp('192.168.0.2', 2121, 'ftp', 'ftp')

// client.parentList().then( (result) => {
//     console.log('Task done');    
// });

// Access a specific folder
//client.accessFolder('/Download')

// how to call default parameters which are in middle
let localPath = 'C:/Users/ACER/Desktop/data'
let remotePath = '/memes'
client.downloadFullDirectory(localPath, remotePath)
