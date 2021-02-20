const ftp = require('basic-ftp');
const fs = require('fs');

class ListFiles {

    static async parentList(client, settings) {
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

module.exports = ListFiles;