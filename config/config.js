var path = require('path'),
    rootPath = path.normalize(__dirname + '/..')


    var db = process.env.DATABASE_URL;
db = db.match(/^[a-z]*:\/\/([a-z0-9]+):([a-z0-9_-]+)@([a-z0-9_.-]+):([0-9]+)\/([a-z0-9_-]+)$/i);
module.exports = {
    development: {
        db: {
            host: db[2],
            port: db[3],
            user: db[0],
            password: db[1],
            database: db[4],
            ssl: true
        },
        root: rootPath,
        app: {
            name: 'fb commenter'
        },
        facebook: {
            clientID: process.env.FACEBOOK_APP_ID
            clientSecret: process.env.FACEBOOK_SECRET
            callbackURL: "http://dev.lintaba.hu:3001/auth/facebook/callback"
        }
    },

    HEROKU: {
        root: rootPath,
        db: {
            host: db[2],
            port: db[3],
            user: db[0],
            password: db[1],
            database: db[4],
        },
        app: {
            name: 'fb commenter'
        },
        facebook: {
            clientID: process.env.FACEBOOK_APP_ID
            clientSecret: process.env.FACEBOOK_SECRET
            callbackURL: "http://lintabapp.herokuapp.com/auth/facebook/callback"
        }
    }
}
