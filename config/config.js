var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      service: 'postmark',
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      key: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }


module.exports = {
  development: {
    db: 'postgres://sqgkvzosmjvier:yUqd8Z4m_4yVk_jwLq-8sQx41l@ec2-54-221-227-25.compute-1.amazonaws.com:5432/d24odihcp1223b',
    root: rootPath,
    notifier: notifier,
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
    notifier: notifier,
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
