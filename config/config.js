var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')


module.exports = {
  development: {
    db: 'postgres://sqgkvzosmjvier:yUqd8Z4m_4yVk_jwLq-8sQx41l@ec2-54-221-227-25.compute-1.amazonaws.com:5432/d24odihcp1223b',
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
    db: 'postgres://sqgkvzosmjvier:yUqd8Z4m_4yVk_jwLq-8sQx41l@ec2-54-221-227-25.compute-1.amazonaws.com:5432/d24odihcp1223b',
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
  production: {}
}
