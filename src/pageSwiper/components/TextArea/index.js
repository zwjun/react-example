/**
 *
 * created by ZHONG JUN on 2018-06-29 22:56
 */

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import './index.less';

const ANTDTextArea = Input.TextArea;

class TextArea extends PureComponent {
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      width: '',
      style: {
        fontSize: '18px', // -->12px
        lineHeight: '27px', // 单行-->27px 多行-->18px
      }
    };
  }
  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this.dom);
    const width1 = document.defaultView.getComputedStyle(dom, null).width;
    const width = window.getComputedStyle(dom, null).width;
    this.setState({
      width: width.slice(0, -2) },
      () => {
        this.autoValueSize()
      });
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.value !== this.props.value) {
      this.autoValueSize(nextProps.value)
    }
  }

  autoValueSize = (nextValue) => {
    const { width, style } = this.state;
    const { value, fontSize } = this.props;
    // const minRowBtye = Math.floor(width / fontSize.maxFontSize.slice(0, -2) * 2);
    // const maxRowBtye = Math.floor(width / fontSize.minFontSize.slice(0, -2) * 2);
    const minRowBtye = width / fontSize.maxFontSize.slice(0, -2) * 2;
    const maxRowBtye = width / fontSize.minFontSize.slice(0, -2) * 2;
    const valueBtye = value ? this.checkLength(nextValue) : '';
    console.log('size', minRowBtye, maxRowBtye, valueBtye);
    if ( valueBtye > minRowBtye && valueBtye <= maxRowBtye) {
      console.log('1111');
      this.setState({
        style: {
          fontSize: '12px',
          lineHeight: '27px',
          height: 'normal_height'
        }
      });
    }
    if (valueBtye > maxRowBtye) {
      console.log('2222');
      this.setState({
        style: {
          fontSize: '12px',
          lineHeight: '18px',
          height: 2
        }
      });
    }
    if (valueBtye <= minRowBtye) {
      this.setState({
        style: {
          fontSize: '18px',
        }
      });
    }
  };
  checkLength = (str) => {
    const length = str.length;
    let sum = 0;
    for (let i = 0; i < length ; i++) {
      if (str.charCodeAt(i) >= 0 && (str.charCodeAt(i) <= 255)) {
        sum = sum + 1;
      } else {
        sum = sum + 2;
      }
    }
    return sum;
  };
  render() {
    const {
      maxRows,
      ...rest
    } = this.props;
    const { style } = this.state;
    return (
      <div className="ws_textArea">
        <ANTDTextArea
          ref={e => this.dom = e}
          autosize={{ minRows: 1, maxRows }}
          style={style}
          className={`height_${style.height}`}
          {...rest}
        />
      </div>
    );
  }
}

TextArea.propTypes = {
  maxRows: PropTypes.string,
  fontSize: PropTypes.object
};

TextArea.defaultProps = {
  fontSize: {
    maxFontSize: '18px',
    minFontSize: '12px'
  }
};

export default TextArea;

 