/**
 * Module dependencies.
 */

var express = require('express'),
    flash = require('connect-flash'),
    pkg = require('../package.json'),
    session = require('express-session')

    ,
    env = process.env.NODE_ENV || 'development'

var jadeStatic=function(){
    var checkFileAndProcess, fs, jade, path, readAndSendTemplate;

    path = require('path');
    fs = require('fs');
    jade = require('jade');
    readAndSendTemplate = function(d, res, next) {
      return fs.readFile(d, 'utf8', function(err, data) {
        var html, template;
        if (err != null) {
          return next();
        }
        try {
          template = jade.compile(data, {
            filename: d
          });
          html = template(res.locals);
          return res.send(html, {
            'Content-Type': 'text/html'
          }, 200);
        } catch (_error) {
          err = _error;
          return next(err);
        }
      });
    };

    checkFileAndProcess = function(d, res, next) {
      return fs.lstat(d, function(err, stats) {
        if ((err == null) && stats.isFile()) {
          return readAndSendTemplate(d, res, next);
        } else {
          return next();
        }
      });
    };

    return function(options) {
      if (options == null) {
        throw new Error("A path must be specified.");
      }
      if (typeof options === 'string') {
        options = {
          src: options,
          html: true
        };
      }
      if (typeof options.html === 'undefined') {
        options.html = true;
      }
      return function(req, res, next) {
        var d;
        d = path.join(options.src, req.url)+".jade";
        return fs.lstat(d, function(err, stats) {
          if ((err == null) && stats.isDirectory()) {
            return checkFileAndProcess("" + d + "/index.jade", res, next);
          } else if ((err == null) && stats.isFile() && path.extname(d) === '.jade') {
            return readAndSendTemplate(d, res, next);
          } else if ((options.html != null) && path.extname(d) === '.html') {
            return checkFileAndProcess(d.replace(/html$/, 'jade'), res, next);
          } else {
            return next();
          }
        });
      };
    };

}()


module.exports = function(app, config, passport) {

    app.set('showStackError', true)

    // should be placed before express.static
    app.use(express.compress({
        filter: function(req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
        },
        level: 9
    }))

    app.use(express.favicon())
    app.use(express.static(config.root + '/static'))
    app.use(express.static(config.root + '/chrome-extension/src'))
    // set views path, template engine and default layout
    app.set('views', config.root + '/app/views')
    app.set('view engine', 'jade')

    app.configure(function() {
        // expose package.json to views
        app.use(function(req, res, next) {
            res.locals.pkg = pkg
            next()
        })

        // cookieParser should be above session
        app.use(express.cookieParser())

        // bodyParser should be above methodOverride
        app.use(express.bodyParser())
        app.use(express.methodOverride())

        app.use(session({secret: "42"}));

        // use passport session
        app.use(passport.initialize())
        app.use(passport.session())

        // connect flash for flash messages - should be declared after sessions
        app.use(flash())
    app.use(function(err,req,res,next){console.log(req);next();})

        // routes should be at the last
        app.use(app.router)

        app.use(jadeStatic(config.root+"/app/views/static/"))


        app.use(function(err, req, res, next) {
            if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
                return next()
            }
            console.error("500",req.originalUrl);
            res.status(500).render('500', {
                error: err.stack
            })
        })
        app.use(function(req, res, next) {
            console.error(404,req.originalUrl);
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            })
        })
    })

    // development env config
    app.configure('development', function() {
        app.locals.pretty = true
    })
}
