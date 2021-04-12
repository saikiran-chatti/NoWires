const ftp = require('basic-ftp');
const fs = require('fs');
const Lists = require('../ftp/list')
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;
const { Duplex } = require('stream')
// const { setFlagsFromString } = require('v8');

class FTPClient {
    constructor(host, port, username, password, secure = false) {
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

    // use this to filter data according to size/lastmod etc...
    // async getSortOrder(prop) {
    //     return function (a, b) {
    //         if (a[prop] > b[prop]) {
    //             return 1;
    //         } else if (a[prop] < b[prop]) {
    //             return -1;
    //         }
    //         return 0;
    //     }
    // }


    // List operations
    async rootFolder() {
        let res = null
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

            res = await self.client.list();
            // res.sort(this.getSortOrder("name"));
            self.client.close();

            return res;
        }
        catch (err) {
            console.log(err)
            self.client.close();
            throw new Error("Error: " + err)
        }

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

            console.log("oldPath: " + path + '/' + oldname);
            console.log("newPath: " + path + '/' + newname);

            await self.client.rename(path + '/' + oldname, path + '/' + newname);
            await self.client.cd(path)

            let result = await self.client.list()
            self.client.close();

            return result;
        }
        catch (err) {
            console.log(err)
            self.client.close();
            throw new Error("Error: " + err)
        }
    }

    // Delete File
    async deleteFile(path, fileName) {
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

            const deletePath = path + '/' + fileName;
            console.log('delete path: ' + deletePath)
            await self.client.remove(deletePath);

            await self.client.cd(path)
            let result = await self.client.list()
            self.client.close();

            return result;
        }
        catch (err) {
            console.log(err)
            self.client.close();
            throw new Error("Error: " + err)
        }
    }

    async deleteFolder(path, fileName) {
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

            const deleteFolderPath = path + '/' + fileName + '/';
            await self.client.removeDir(deleteFolderPath);

            await self.client.cd(path)
            let result = await self.client.list()
            self.client.close();

            return result;
        }
        catch (err) {
            console.log(err)
            self.client.close();
            throw new Error("Error: " + err)
        }
    }

    // Download
    async downloadDirectory(path, name) {
        let self = this;
        self.client.ftp.verbose = true

        let localPath = desktopDir + "/No Wires/" + name;
        // let remotePath = '/memes'
        let remotePath = path + '/' + name;

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
            await self.client.downloadToDir(localPath, remotePath)
            return ('Downloaded successfully.');
        }
        catch (err) {
            console.log(err);
            throw new Error("Error: " + err)
        }
        // let self = this;
        // self.client.ftp.verbose = true
        // const localPath = desktopDir + "/No Wires";

        // console.log("remote path: " + path);

        // try {
        //     await self.client.access({
        //         host: self.settings.host,
        //         port: self.settings.port,
        //         user: self.settings.user,
        //         password: self.settings.password,
        //         // secure: self.settings.secure
        //     })

        //     fs.mkdir(localPath, err => {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log("New directory successfully created.")
        //         }
        //     })

        //     const downloadPath = path + '/' + name;
        //     await self.client.cd(downloadPath)

        //     await self.client.downloadToDir(localPath)

        //     self.client.close();
        //     return 'Downloaded successfully.'
        // }
        // catch (err) {
        //     console.log(err)
        //     self.client.close();
        //     return err;
        // }
        // self.client.close();

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

            // track progress.
            // self.client.trackProgress(info => {
            //     console.log("File", info.name)
            //     console.log("Type", info.type)
            //     console.log("Transferred", info.bytes)
            //     console.log("Transferred Overall", info.bytesOverall)
            // })

            await self.client.downloadTo(localPath + '/' + name, remotePath + '/' + name)

            // self.client.trackProgress();
            // self.client.close();
            return 'Downloaded successfully.'
        }
        catch (err) {
            console.log(err)
            self.client.close();
            throw new Error("Error: " + err)
        }
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
            self.client.close();
            console.log(err);
            throw new Error("Error: " + err)
        }
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
            self.client.close();
            console.log(err);
            throw new Error("Error: " + err)
        }
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
            await self.client.cd(path)

            let result = await self.client.list()
            self.client.close();

            return result;
        } catch (err) {
            self.client.close();
            console.log(err);
            throw new Error("Error: " + err)
        }
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

            await self.client.cd(data.path)
            let result = await self.client.list()
            self.client.close();
            return result;
        } catch (err) {
            console.log(err);
            self.client.close();
            throw new Error("Error: " + err)
        }
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
