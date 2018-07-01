import React, {Component} from 'react';
import HOC from './components/HOC';
import Background from './components/Background';
import TextArea from './components/TextArea';

import './index.less';

class SwiperComponennt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'PC454457576534523424',
      footerText: '此联备份',
      ch: '',
      ajmc: '',
      gzyy: ''
    }
  }

  onSubmit = (element) => {
    console.log('onSubmit', this.state);
  };

  onChange = (event) => {
    const { target } = event;
    const { type, checked, name, value } = target;
    const nextValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: nextValue
    })
  };

  render() {
    const { id, footerText } = this.state;
    const { layout } = this.props;
    return (
      <div className={layout}>
        <Background id={id} footerText={footerText}>
          <div className="ws_header">
            <p className="yzdw">X X X 公安局 X X X 分局</p>
            <h1 className="title">立案报告书</h1>
            <h4 className="sub_title">（副本）</h4>
            <p className="whh">国字号 [001] 0001 号</p>
          </div>
          <div className="ws_content">
            <div className="row">
              <div style={{ width: "250px" }}>
                <TextArea
                  name="ch"
                  placeholder="称呼"
                  value={this.state.ch}
                  onChange={this.onChange}
                />
              </div>
              <span>：</span>
            </div>
            <div className="row">
              <span className="text_indent_2">经调查</span>
              <div className="flex_1">
                <TextArea
                  name="ajmc"
                  placeholder="案件名称"
                  value={this.state.ajmc}
                  onChange={this.onChange}
                />
              </div>
              <span>一案，</span>
            </div>
            <div className="row">
              <span>认为</span>
              <div className="flex_1">
                <TextArea
                  name="gzyy"
                  placeholder="告知原因"
                  value={this.state.gzyy}
                  onChange={this.onChange}
                />
              </div>
              <span>，</span>
            </div>
          </div>
        </Background>
        <Background id={id} footerText={footerText}>22222</Background>
        <Background id={id} footerText={footerText}>33333</Background>
        <Background id={id} footerText={footerText}>44444</Background>
      </div>
    );
  }
}

export default HOC(SwiperComponennt, 'PCID001');
