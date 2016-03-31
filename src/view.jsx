/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import { shallowEqual } from 'alaska-admin-view';
import { Input } from 'react-bootstrap';

export default class PasswordFieldView extends React.Component {

  static propTypes = {
    errorText: React.PropTypes.string,
    disabled: React.PropTypes.bool
  };

  static contextTypes = {
    t: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: ''
    };
    this.handleChange1 = this.handleChange.bind(this, 1);
    this.handleChange2 = this.handleChange.bind(this, 2);
  }

  shouldComponentUpdate(props, state) {
    return props.disabled !== this.props.disabled || !shallowEqual(state, this.state);
  }

  handleChange(index, e) {
    this.setState({ ['value' + index]: e.target.value });
  }

  handleBlur = () => {
    const t = this.context.t;
    let value1 = this.state.value1;
    let value2 = this.state.value2;
    let newState = {
      errorText: ''
    };
    if (value1 && value1 != value2) {
      newState.errorText = t(value2 ? 'The passwords are not match' : 'Please enter the new password again');
    }
    if (value1 && value1 == value2) {
      this.props.onChange && this.props.onChange(value1);
    }

    this.setState(newState);
  };

  render() {
    const t = this.context.t;
    let props = this.props;
    let state = this.state;
    let className = 'form-group';

    let help = props.field.help;
    let errorText = state.errorText;
    if (!errorText) {
      errorText = props.errorText;
    }
    if (errorText) {
      help = errorText;
      className += ' has-error';
    }

    return (
      <div className={className}>
        <label className="col-md-2 control-label">{props.field.label}</label>
        <div className="col-md-10">
          <div className="col-sm-4" style={{marginRight:20}}>
            <Input
              type="password"
              value={state.value1}
              help={help}
              placeholder={t('Enter new password')}
              disabled={props.disabled}
              onBlur={this.handleBlur}
              onChange={this.handleChange1}
              style={{ marginRight:10 }}
            />
          </div>
          <div className="col-sm-4">
            <Input
              type="password"
              value={state.value2}
              placeholder={t('Repeat password')}
              disabled={props.disabled}
              onBlur={this.handleBlur}
              onChange={this.handleChange2}
            />
          </div>
        </div>
      </div>
    );
  }
}
