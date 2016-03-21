'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alaskaAdminView = require('alaska-admin-view');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-02
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PasswordFieldView = function (_React$Component) {
  _inherits(PasswordFieldView, _React$Component);

  function PasswordFieldView(props) {
    _classCallCheck(this, PasswordFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PasswordFieldView).call(this, props));

    _this.handleBlur = function () {
      var value1 = _this.state.value1;
      var value2 = _this.state.value2;
      var newState = {};
      if (value1 && value1 != value2) {
        newState.errorText2 = value2 ? '密码不一致' : '请再次输入密码';
      }
      if (value1 && value1 == value2) {
        _this.props.onChange && _this.props.onChange(value1);
      }

      _this.setState(newState);
    };

    _this.state = {
      value1: '',
      value2: ''
    };
    _this.handleChange1 = _this.handleChange.bind(_this, 1);
    _this.handleChange2 = _this.handleChange.bind(_this, 2);
    return _this;
  }

  _createClass(PasswordFieldView, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return props.disabled !== this.props.disabled || !(0, _alaskaAdminView.shallowEqual)(state, this.state);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(index, e) {
      this.setState(_defineProperty({}, 'value' + index, e.target.value));
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      return _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { className: 'col-md-2 control-label' },
          props.field.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-md-10' },
          _react2.default.createElement(
            'div',
            { className: 'col-sm-4', style: { marginRight: 20 } },
            _react2.default.createElement(_reactBootstrap.Input, {
              type: 'password',
              value: state.value1,
              errorText: this.state.oneErrorText,
              placeholder: '输入新密码',
              disabled: props.disabled,
              onBlur: this.handleBlur,
              onChange: this.handleChange1,
              style: { marginRight: 10 }
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-sm-4' },
            _react2.default.createElement(_reactBootstrap.Input, {
              type: 'password',
              value: state.value2,
              errorText: this.state.twoErrorText,
              placeholder: '再次输入新密码',
              disabled: props.disabled,
              onBlur: this.handleBlur,
              onChange: this.handleChange2
            })
          )
        )
      );
    }
  }]);

  return PasswordFieldView;
}(_react2.default.Component);

PasswordFieldView.propTypes = {
  errorText: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool
};
exports.default = PasswordFieldView;