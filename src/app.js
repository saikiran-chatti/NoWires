const ftp = require('./FTPClient')

const client = new ftp('192.168.43.1',2232,'anonymous','guest')
client.parentList();

// Access a specific folder
client.accessFolder('/Download')

// how to call default parameters which are in middle