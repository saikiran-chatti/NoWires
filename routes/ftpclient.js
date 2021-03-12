const ftp = require('basic-ftp');
const fs = require('fs');
const Lists = require('../ftp/list')
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;
const { Duplex } = require('stream')
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

    // List operations
    async rootFolder() {
        let res = null
        try {
            res = await Lists.parentList(this.client, this.settings);
        }
        catch (err) {
            console.log(err);
        }
        return res;
    }

    // Rename file
    async renameFile(oldname, newname, path) {
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

            await self.client.rename(path + '/' + oldname, path + '/' + newname);

            let result = await self.client.list()
            self.client.close();

            return result;
        }
        catch (err) {
            console.log(err)
        }
        self.client.close();
    }

    // Delete File
    async deleteFile(path) {
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

            await self.client.remove(path);

            let result = await self.client.list()
            self.client.close();

            return result;
        }
        catch (err) {
            console.log(err)
        }
        self.client.close();
    }

    // Download
    async downloadDirectory(localPath, remotePath) {
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

    async downloadFile(name, remotePath) {
        let self = this;
        const localPath = desktopDir + "/No Wires";
        self.client.ftp.verbose = true

        try {
            await self.client.access({
                host: self.settings.host,
                port: self.settings.port,
                user: self.settings.user,
                password: self.settings.password,
                // secure: self.settings.secure
            })

            fs.mkdir(localPath, err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("New directory successfully created.")
                }
            })
            await self.client.downloadTo(localPath + '/' + name, remotePath + '/' + name)
            return 'Downloaded successfully.'
        }
        catch (err) {
            console.log(err)
        }
        self.client.close();
    }

    //Folder operations
    async changePath(path) {
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
            await console.log('Path changed successfully');
            self.client.close();

            return result;

        } catch (err) {
            console.log(err);
        }
        self.client.close();
    }

    // create Folder
    async createFolder(name, path) {
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
            let cwd = 'CWD ' + path;
            await self.client.send(cwd)
            let command = 'MKD ' + name
            await self.client.send(command)
            let result = await self.client.list()
            self.client.close();
            return result;

        } catch (err) {
            console.log(err);
        }
        self.client.close();
    }

    async uploadFile(data, path) {
        let self = this
        self.client.ftp.verbose = true
        console.log('path: ' + path);
        try {
            await self.client.access({
                host: self.settings.host,
                port: self.settings.port,
                user: self.settings.user,
                password: self.settings.password,
                // secure: self.settings.secure
            })
            path = path + '/convocation.pdf'
            await self.client.uploadFrom('D:/convocation.pdf', path);
            let result = await self.client.list()
            self.client.close();

            return result;
        } catch (err) {
            console.log(err);
        }
        self.client.close();
    }

    async uploadDragFile(data) {
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

            let s = new Duplex();
            await s.push(Buffer.from(data.value, 'ascii'))
            await s.push(null)

            await self.client.uploadFrom(s, data.path + '/' + data.fileName)

            let result = await self.client.list()
            self.client.close();
            return result;
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
