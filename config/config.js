var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');


var db = process.env.DATABASE_URL;
db = db.match(/^[a-z]*:\/\/([a-z0-9]+):([a-z0-9_-]+)@([a-z0-9_.-]+):([0-9]+)\/([a-z0-9_-]+)$/i);
module.exports = {
    development: {
        db: {
            host: db[3],
            port: db[4],
            user: db[1],
            password: db[2],
            database: db[5],
            ssl: true
        },
        root: rootPath,
        app: {
            name: 'fb commenter'
        },
        facebook: {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: "https://dev.lintaba.hu:3001/auth/facebook/callback"
        }
    },

    HEROKU: {
        root: rootPath,
        db: {
            host: db[3],
            port: db[4],
            user: db[1],
            password: db[2],
            database: db[5],
            ssl: true
        },
        app: {
            name: 'fb commenter'
        },
        facebook: {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: "https://lintabapp.herokuapp.com/auth/facebook/callback"
        }
    }
}
