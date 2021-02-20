const ftp = require('basic-ftp');
const fs = require('fs');

class FolderOperation {

    static async createFolder(path, client, settings) {
        client.ftp.verbose = true

        try {
            await client.access({
                host: settings.host,
                port: settings.port,
                user: settings.user,
                password: settings.password,
                // secure: self.settings.secure
            })
            let result = await client.ensureDir('/NoWires')

            return result;
        }
        catch (err) {
            console.log(err)
        }
        client.close();
    }

    static async deleteFolder(path, client, settings) {
        client.ftp.verbose = true

        try {
            await client.access({
                host: settings.host,
                port: settings.port,
                user: settings.user,
                password: settings.password,
                // secure: self.settings.secure
            })
            let result = await client.list()

            return result;
        }
        catch (err) {
            console.log(err)
        }
        client.close();
    }
}

module.exports = FolderOperation;