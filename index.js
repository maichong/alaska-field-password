/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

'use strict';

const bcrypt = require('bcrypt');

exports.views = {
  cell: {
    name: 'PasswordFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'PasswordFieldView',
    field: __dirname + '/lib/view.js'
  }
};

exports.plain = String;


/**
 * 初始化Schema
 * @param field   alaksa.Model中的字段配置
 * @param schema
 * @param Model
 */
exports.initSchema = function (field, schema, Model) {
  field.workFactor = field.workFactor || 10;
  let NEED_HASHING = '__' + field.path + '_needs_hassing';
  schema.path(field.path, {
    type: String,
    required: field.required,
    set: function (password) {
      this[NEED_HASHING] = true;
      return password;
    }
  });
  Model.underscoreMethod(field.path, 'data', function () {
    return this.get(field.path) ? '' : null;
  });

  /**
   * [async] 比较密码
   * @params {string} candidate
   */
  Model.underscoreMethod(field.path, 'compare', function (candidate) {
    let record = this;
    return new Promise(function (resolve, reject) {
      let value = record.get(field.path);
      if (!value) return resolve(false);
      bcrypt.compare(candidate, record.get(field.path), function (error, res) {
        if (error) return reject(error);
        resolve(res);
      });
    });
  });

  schema.pre('save', function (next) {
    let record = this;
    if (!record.isModified(field.path) || !record[NEED_HASHING]) {
      return next();
    }

    if (!record.get(field.path)) {
      record.set(field.path, undefined);
      return next();
    }

    bcrypt.genSalt(field.workFactor, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(record.get(field.path), salt, function (error, hash) {
        if (error) return next(err);
        record.set(field.path, hash);
        next();
      });
    });
  });
};
