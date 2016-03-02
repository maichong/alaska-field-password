/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');
const _ = require('lodash');
const md5 = require('md5');

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
  schema.path(field.path, _.defaults({
    type: String,
    set: md5
  }, field.options));
};
