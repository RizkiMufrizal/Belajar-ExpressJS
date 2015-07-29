var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon'); //untuk favicon
var morgan = require('morgan'); //untuk log aplikasi
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');

var logger = require('./utils/logger');

var app = express();

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.get('/', function(req, res) {
  res.render('index');
});

if ('development' === app.get('env')) {
  app.use(errorhandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Server jalan pada port ' + app.get('port'));
});
