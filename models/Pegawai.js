(function() {
  'use strict';

  var pegawai,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  pegawai = new Schema({
    idPegawai: {
      type: 'String',
      required: true
    },
    namaPegawai: {
      type: 'String',
      required: true
    },
    alamat: {
      type: 'String'
    },
    tanggalLahir: {
      type: 'Date',
      required: true
    }
  }, {
    collection: 'tb_pegawai'
  });

  module.exports = mongoose.model('Pegawai', pegawai);

}).call(this);
