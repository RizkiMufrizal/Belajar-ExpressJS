(function() {
  'use strict';

  var http = require('http'),
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'), //untuk favicon
    morgan = require('morgan'), //untuk log aplikasi
    methodOverride = require('method-override'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    logger = require('./utils/logger'),
    mongoose = require('mongoose'),
    app = express();

  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(morgan('combined', {
    stream: logger.stream
  }));
  app.use(methodOverride());
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'bower_components')));

  app.get('/', function(req, res) {
    return res.render('index');
  });

  mongoose.connect('mongodb://localhost/BelajarExpressJS', function(err, res) {
    if (err) {
      return logger.error('koneksi mongodb gagal bung', err);
    } else {
      return logger.info('koneksi mongodb berhasil');
    }
  });

  if ('development' === app.get('env')) {
    app.use(errorhandler());
  }

  var PegawaiRoute = require('./routes/PegawaiRoute');
  app.use('/api/', PegawaiRoute);

  var server = http.createServer(app);
  server.listen(app.get('port'), function() {
    return console.log('Server jalan pada port ' + app.get('port'));
  });

}).call(this);
