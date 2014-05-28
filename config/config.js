var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')


module.exports = {
  development: {
    db: {
  host: 'ec2-54-221-227-25.compute-1.amazonaws.com',
  port: 5432,
  user: 'sqgkvzosmjvier',
  password: 'yUqd8Z4m_4yVk_jwLq-8sQx41l',
  database: 'd24odihcp1223b',
  ssl: true
},
    root: rootPath,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },
    facebook: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    }
  },
  test: {
    root: rootPath,
    db: {
  host: 'ec2-54-221-227-25.compute-1.amazonaws.com',
  port: 5432,
  user: 'sqgkvzosmjvier',
  password: 'yUqd8Z4m_4yVk_jwLq-8sQx41l',
  database: 'd24odihcp1223b',
  ssl: true
},
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },
    facebook: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    }
  },
  production: {}
}
