(function() {
  'use strict';

  var express = require('express'),
    Pegawai = require('../models/Pegawai'),
    logger = require('../utils/logger'),
    csrf = require('csurf'),
    router = express.Router(),
    csrfProtection = csrf({
      cookie: true
    }),
    uuid = require('node-uuid');

  router.get('/', function(req, res) {
    return Pegawai.find(function(err, pegawais) {

      if (err) {
        logger.error('error bung ', err);
        return res.render('500');
      }

      logger.debug('Berhasil ngambil data bung ', pegawais);
      return res.render('index', {
        pegawais: pegawais
      });

    });
  });

  router.get('/tambah/pegawai', csrfProtection, function(req, res) {
    logger.info('render page tambah');
    return res.render('tambah', {
      csrfToken: req.csrfToken()
    });
  });

  router.post('/save/pegawai', csrfProtection, function(req, res) {
    var pegawai = new Pegawai({
      idPegawai: uuid.v4(),
      namaPegawai: req.body.namaPegawai,
      alamat: req.body.alamat,
      tanggalLahir: req.body.tanggalLahir
    });

    return pegawai.save(function(err, pegawai) {
      if (err) {
        logger.error('error bung ', err);
        return res.render('500');
      }

      logger.debug('data tersimpan bung ', pegawai);
      logger.info('render page awal');
      return res.redirect('/');
    });

  });

  router.get('/edit/pegawai/:idPegawai', csrfProtection, function(req, res) {
    logger.info('edit pegawai');

    var idPegawai = req.params.idPegawai;

    Pegawai.findOne({
      idPegawai: idPegawai
    }, function(err, pegawai) {

      if (err) {
        logger.error('error bung ', err);
        return res.render('500');
      }

      logger.debug('data tersedia ', pegawai);
      logger.info('render page edit');
      return res.render('edit', {
        pegawai: pegawai,
        csrfToken: req.csrfToken()
      });
    });
  });

  router.post('/update/pegawai/:idPegawai', csrfProtection, function(req, res) {

    var idPegawai = req.params.idPegawai;

    Pegawai.findOne({
      idPegawai: idPegawai
    }, function(err, pegawai) {

      if (err) {
        logger.error('error bung ', err);
        return res.render('500');
      }

      pegawai.namaPegawai = req.body.namaPegawai;
      pegawai.alamat = req.body.alamat;
      pegawai.tanggalLahir = req.body.tanggalLahir;
      pegawai.save();

      logger.debug('data tersimpan bung ', pegawai);
      logger.info('render page awal');

      res.redirect('/');
    });
  });

  router.get('/delete/pegawai/:idPegawai', function(req, res) {
    Pegawai.remove({
      idPegawai: req.params.idPegawai
    }, function(err) {
      if (err) {
        logger.error('error bung ', err);
        return res.render('500');
      }

      logger.debug('data dihapus');
      logger.info('render page awal');
      res.redirect('/');
    });
  });

  module.exports = router;

}).call(this);
