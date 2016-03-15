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
    children: React.PropTypes.node
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
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
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

  componentWillUnmount() {
  }

  _onInputOneBlur() {
    let inputOne = this.refs.inputOne.getValue().trim();
    if (inputOne != "" && (inputOne.length < 6 || inputOne.length > 20)) {
      this.setState({oneErrorText: "密码长度必须在6-20位"});
    } else {
      this.setState({oneErrorText: ""});
      if (inputOne != "") {
        this._submitPwd.call(this, 1);
      }
    }
  }

  _onInputTwoBlur() {
    let inputTwo = this.refs.inputTwo.getValue().trim();
    if (inputTwo != "" && (inputTwo.length < 6 || inputTwo.length > 20)) {
      this.setState({twoErrorText: "密码长度必须在6-20位"});
    } else {
      this.setState({twoErrorText: ""});
      if (inputTwo != "") {
        this._submitPwd.call(this, 2);
      }
    }
  }

  _submitPwd(index) {
    let inputOne = this.refs.inputOne.getValue().trim();
    let inputTwo = this.refs.inputTwo.getValue().trim();
    let one = false;
    let two = false;
    if (inputOne == "") {
      this.setState({oneErrorText: ""});
    } else if (inputOne.length < 6 || inputOne.length > 20) {
      this.setState({oneErrorText: "密码长度必须在6-20位"});
    } else {
      this.setState({oneErrorText: ""});
      one = true;
    }
    if (inputTwo == "") {
      this.setState({twoErrorText: ""});
    } else if (inputTwo.length < 6 || inputTwo.length > 20) {
      this.setState({twoErrorText: "密码长度必须在6-20位"});
    } else {
      this.setState({twoErrorText: ""});
      two = true;
    }
    if (one && two){
      if(inputOne === inputTwo) {
        this.props.onChange && this.props.onChange(inputOne);
      }else{
        if(index == 1){
          this.setState({oneErrorText: "密码不一致"});
        }else{
          this.setState({twoErrorText: "密码不一致"});
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
          ref="inputOne"
          type="password"
          errorText={this.state.oneErrorText}
          floatingLabelText="输入新密码"
          disabled={props.disabled}
          onBlur={this._submitPwd.bind(this,1)}
        />
        <br/>
        <TextField
          ref="inputTwo"
          type="password"
          errorText={this.state.twoErrorText}
          floatingLabelText="再次输入新密码"
          disabled={props.disabled}
          onBlur={this._submitPwd.bind(this,2)}
        />
      </div>
    );
  }
}
