(function() {
  'use strict';

  var express = require('express'),
    logger = require('../utils/logger'),
    router = express.Router();

  router.get('/', function(req, res) {
    logger.info('render page index');
    return res.render('index');
  });

  module.exports = router;

}).call(this);
