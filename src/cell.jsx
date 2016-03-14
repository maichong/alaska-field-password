/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-02
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

export default class PasswordFieldCell extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>******</div>
    );
  }
}
