'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/lib/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

var _textField = require('material-ui/lib/text-field');

var _textField2 = _interopRequireDefault(_textField);

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

  function PasswordFieldView(props, context) {
    _classCallCheck(this, PasswordFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PasswordFieldView).call(this, props));

    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views
    };
    console.log(props);
    _this.handleChange1 = _this.handleChange.bind(_this, 1);
    _this.handleChange2 = _this.handleChange.bind(_this, 2);
    _this.handleBlur1 = _this.submitPwd.bind(_this, 1);
    _this.handleBlur2 = _this.submitPwd.bind(_this, 2);
    return _this;
  } //密码不一致提示

  _createClass(PasswordFieldView, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.context.views
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return props.disabled != this.props.disabled;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
      }
      if (nextContext.views) {
        newState.views = nextContext.views;
      }
      this.setState(newState);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(index, e) {
      this.setState(_defineProperty({}, 'value' + index, e.target.value));
    }
  }, {
    key: 'submitPwd',
    value: function submitPwd(index) {
      var inputOne = this.state.value1;
      var inputTwo = this.state.value2;
      var one = false;
      var two = false;
      if (inputOne === '') {
        this.setState({ oneErrorText: this.props.inputOneErrorText || '' });
      } else {
        this.setState({ oneErrorText: '' });
        one = true;
      }
      if (inputTwo === '') {
        this.setState({ twoErrorText: this.props.inputTwoErrorText || '' });
      } else {
        this.setState({ twoErrorText: '' });
        two = true;
      }
      if (one && two) {
        if (inputOne === inputTwo) {
          this.props.onChange && this.props.onChange(inputOne);
        } else {
          if (index == 1) {
            this.setState({ oneErrorText: this.props.errorText || '' });
          } else {
            this.setState({ twoErrorText: this.props.errorText || '' });
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var styles = {
        root: {}
      };
      return _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(_textField2.default, {
          value: state.value1,
          type: 'password',
          errorText: state.oneErrorText,
          floatingLabelText: '输入新密码',
          disabled: props.disabled,
          onBlur: this.handleBlur1,
          onChange: this.handleChange1,
          style: { marginRight: "10px" }
        }),
        _react2.default.createElement(_textField2.default, {
          value: state.value2,
          type: 'password',
          errorText: state.twoErrorText,
          floatingLabelText: '再次输入新密码',
          disabled: props.disabled,
          onBlur: this.handleBlur2,
          onChange: this.handleChange2
        })
      );
    }
  }]);

  return PasswordFieldView;
}(_react2.default.Component);

PasswordFieldView.propTypes = {
  children: _react2.default.PropTypes.node,
  inputOneErrorText: _react2.default.PropTypes.string, //新密码不合规则提示
  inputTwoErrorText: _react2.default.PropTypes.string, //重复密码不合规则提示
  errorText: _react2.default.PropTypes.string };
PasswordFieldView.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
PasswordFieldView.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object
};
PasswordFieldView.mixins = [_contextPure2.default];
exports.default = PasswordFieldView;