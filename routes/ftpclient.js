const ftp = require('basic-ftp');
const fs = require('fs');
// const { setFlagsFromString } = require('v8');

class FTPClient {
    constructor(host = '192.168.0.4', port = 2232, username = 'android', password = 'android', secure = false) {
        this.client = new ftp.Client();
        this.path = '/'
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
                // secure: self.settings.secure
            })
            let result = await self.client.list()

            return result;
        }
        catch (err) {
            console.log(err)
        }
        self.client.close();

    }

    sendListToFile() {
        console.log('triggered');
        return { data: "test" }
    }

    async downloadFullDirectory(localPath, remotePath) {
        let self = this;
        self.client.ftp.verbose = true

        try {
            await self.client.access({
                host: self.settings.host,
                port: self.settings.port,
                user: self.settings.user,
                password: self.settings.password,
                // secure: self.settings.secure
            })
            await self.client.downloadToDir(localPath, remotePath)
            console.log('Downloaded successfully');
        }
        catch (err) {
            console.log(err)
        }
        self.client.close();
    }


    async accessFolder(path) {
        let self = this
        self.client.ftp.verbose = true

        try {
            await self.client.access({
                host: self.settings.host,
                port: self.settings.port,
                user: self.settings.user,
                password: self.settings.password,
                // secure: self.settings.secure
            })
            await self.client.cd(path)
            // await console.log(self.client.pwd());
            let result = await self.client.list()
            console.log(result);
            await console.log('Path changed successfully');

        } catch (err) {
            console.log(err);
        }
        self.client.close();
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
