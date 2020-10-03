const ftp = require('basic-ftp');
const fs = require('fs');
const { setFlagsFromString } = require('v8');

class FTPClient {
    constructor(host = 'localhost', port = 21, username = 'anonymous', password = 'guest', secure = false) {
        this.client = new ftp.Client();
        this.settings = {
            host: host,
            port: port,
            user: username,
            password: password,
            secure: secure
        };
    }

    async parentList() {
        let self = this;
        self.client.ftp.verbose = true
        try {
            await self.client.access({
                host: self.settings.host,
                port: self.settings.port,
                user: self.settings.user,
                password: self.settings.password,
                secure: self.settings.secure
            })
            console.log(await self.client.list())
        }
        catch (err) {
            console.log(err)
        }
        self.client.close()

    }

    close() {
        this.client.close();
    }

    changePermissions(perms, filepath) {
        let cmd = 'SITE CHMOD ' + perms + ' ' + filepath;
        return this.client.send(cmd, false);
    }
}

module.exports = FTPClient;
