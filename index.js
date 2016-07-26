/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');
const bcrypt = require('bcryptjs');

class PasswordField extends alaska.Field {
  initSchema() {
    let field = this;
    let schema = this._schema;
    field.workFactor = field.workFactor || 10;
    let NEED_HASHING = '__' + field.path + '_needs_hassing';
    let options = {
      type: String,
      set: function (password) {
        this[NEED_HASHING] = true;
        return password;
      }
    };
    if (field.required) {
      options.required = true;
    }
    schema.path(field.path, options);
    this.underscoreMethod('data', function () {
      return this.get(field.path) ? '' : null;
    });
    this.underscoreMethod('set', function (value) {
      this.set(field.path, value);
      this[NEED_HASHING] = false;
    });

    /**
     * [async] 比较密码
     * @params {string} candidate
     */
    this.underscoreMethod('compare', function (candidate) {
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
      // end of save
    });
  }
}

PasswordField.views = {
  cell: {
    name: 'PasswordFieldCell',
    path: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'PasswordFieldView',
    path: __dirname + '/lib/view.js'
  }
};

PasswordField.plain = String;

module.exports = PasswordField;
