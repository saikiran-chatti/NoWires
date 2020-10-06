const ftp = require('./FTPClient')

const client = new ftp('192.168.0.5',2232,'anonymous','guest')

// client.parentList().then( (result) => {
//     console.log('Task done');    
// });

// Access a specific folder
 client.accessFolder('/Download')

// how to call default parameters which are in middle


