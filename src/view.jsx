/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import TextField from 'material-ui/lib/text-field';
export default class PasswordFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    inputOneErrorText: React.PropTypes.string,//新密码不合规则提示
    inputTwoErrorText: React.PropTypes.string,//重复密码不合规则提示
    errorText: React.PropTypes.string //密码不一致提示
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views
    };
    console.log(props);
    this.handleChange1 = this.handleChange.bind(this, 1);
    this.handleChange2 = this.handleChange.bind(this, 2);
    this.handleBlur1 = this.submitPwd.bind(this, 1);
    this.handleBlur2 = this.submitPwd.bind(this, 2);
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
    };
  }

  shouldComponentUpdate(props, state) {
    return props.disabled != this.props.disabled;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.muiTheme) {
      newState.muiTheme = nextContext.muiTheme;
    }
    if (nextContext.views) {
      newState.views = nextContext.views;
    }
    this.setState(newState);
  }

  handleChange(index, e) {
    this.setState({['value' + index]: e.target.value});
  }

  submitPwd(index) {
    let inputOne = this.state.value1;
    let inputTwo = this.state.value2;
    let one = false;
    let two = false;
    if (inputOne === '') {
      this.setState({oneErrorText: this.props.inputOneErrorText || ''});
    } else {
      this.setState({oneErrorText: ''});
      one = true;
    }
    if (inputTwo === '') {
      this.setState({twoErrorText: this.props.inputTwoErrorText || ''});
    } else {
      this.setState({twoErrorText: ''});
      two = true;
    }
    if (one && two) {
      if (inputOne === inputTwo) {
        this.props.onChange && this.props.onChange(inputOne);
      } else {
        if (index == 1) {
          this.setState({oneErrorText: this.props.errorText || ''});
        } else {
          this.setState({twoErrorText: this.props.errorText || ''});
        }
      }
    }
  }

  render() {
    let props = this.props;
    let state = this.state;
    let styles = {
      root: {}
    };
    return (
      <div style={styles.root}>
        <TextField
          value={state.value1}
          type="password"
          errorText={state.oneErrorText}
          floatingLabelText="输入新密码"
          disabled={props.disabled}
          onBlur={this.handleBlur1}
          onChange={this.handleChange1}
          style={{marginRight:"10px"}}
        />
        <TextField
          value={state.value2}
          type="password"
          errorText={state.twoErrorText}
          floatingLabelText="再次输入新密码"
          disabled={props.disabled}
          onBlur={this.handleBlur2}
          onChange={this.handleChange2}
        />
      </div>
    );
  }
}
