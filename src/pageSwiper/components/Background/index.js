/**
 * 背景组件
 * created by ZHONG JUN on 2018-06-23 21:58
 */

import React from 'react';
import PropTypes from 'prop-types';
import './index.less'

function Background({ children, id, footerText }) {
  return (
    <div className="A4">
      <p className="A4_id">{id}</p>
      <div className="A4_blod">
        <div className="A4_thin">{children}</div>
      </div>
      <p>{footerText}</p>
    </div>
  );
}

Background.propTypes = {};

export default Background;
