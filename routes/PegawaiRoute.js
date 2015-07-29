(function() {
  'use strict';

  var express = require('express'),
    Pegawai = require('../models/Pegawai'),
    logger = require('../utils/logger'),
    router = express.Router();

  router.get('/pegawai', function(req, res) {
    return Pegawai.find(function(err, pegawais) {

      if (err) {
        logger.error('error bung ', err);
        return res.json({
          error: 500,
          pesan: 'mohon maaf, sedang terjadi kesalahan'
        });
      }

      logger.debug('Berhasil ngambil data bung ', pegawais);
      return res.json(pegawais);

    });
  });

  router.post('/pegawai', function(req, res) {
    var pegawai = new Pegawai({
      idPegawai: req.body.idPegawai,
      namaPegawai: req.body.namaPegawai,
      alamat: req.body.alamat,
      tanggalLahir: req.body.tanggalLahir
    });

    return pegawai.save(function(err, pegawai) {
      if (err) {
        logger.error('error bung ', err);
        return res.json({
          error: 500,
          pesan: 'mohon maaf, sedang terjadi kesalahan'
        });
      }

      logger.debug('data tersimpan bung ', pegawai);
      return res.json({
        success: true,
        message: 'Data Tersimpan'
      });
    });

  });

  module.exports = router;

}).call(this);
