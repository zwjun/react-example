/**
 * 文书高阶组件
 * created by ZHONG JUN on 2018-06-23 23:06
 */

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Button, Row, Col, Icon, BackTop } from 'antd';
import classNames from 'classnames';

import './index.less';

// 一页的高度
const pageHeight = 1125;

export default function withSubscription(WrappedComponent, id) {
  class WithSubscription extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isSingle: true,
        currentPage: 0,
        total: 0
      };
    }

    componentDidMount(){
      window.addEventListener('scroll', this.handleScroll);
      // const currentScrollTop = this.getCurrentScrollTop();
      this.setState({
        // currentPage: Math.floor(currentScrollTop / pageHeight),
        total: ReactDOM.findDOMNode(this.dom).children.length
      });
    };
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    };
    handleScroll = () => {
      // let docH = document.body.scrollHeight || document.documentElement.scrollHeight; // 滚动条自身高度
      let scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;  // 滚动条滚动高度
      const currentPage = Math.floor(scrollTop / pageHeight);
      if (Number.isInteger(currentPage)) {
        this.setState({
          currentPage
        });
      }
    };
    setScrollTop = (page, direction = 'next', value = pageHeight) => {
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight; // 滚动条自身高度
      const clientHeight = document.body.clientHeight; // 网页可见区域高
      if (direction === 'next' && this.getCurrentScrollTop() < scrollHeight - value - 48) {
        this.dom.scrollTop = (page + 1) * value;
        document.body.scrollTop = (page + 1) * value;
        document.documentElement.scrollTop = (page + 1) * value;
        // console.log('next', this.getCurrentScrollTop(), scrollHeight);
        // 滚动到底部时不可翻页
        this.setState({
          currentPage: page + 1
        });
      }
      if (direction === 'prev' && this.getCurrentScrollTop() > 0) {
        this.dom.scrollTop = (page - 1) * value;
        document.body.scrollTop = (page - 1) * value;
        document.documentElement.scrollTop = (page - 1) * value;
        this.setState({
          currentPage: page - 1
        });
      }
    };
    getCurrentScrollTop = () => {
      return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    };

    goNext = () => {
      // const scrollTop = ReactDOM.findDOMNode(this.dom).scrollTop;
      this.setScrollTop(this.state.currentPage);
    };

    goPrev = () => {
      this.setScrollTop(this.state.currentPage, 'prev');
    };

    onSubmit = () => {
      this.dom.onSubmit();
    };

    onChangeLayout = () => {
      if (this.state.isSingle) {
        this.setState({ isSingle: false });
      } else {
        this.setState({ isSingle: true });
      }
    };

    render() {
      const { currentPage, total } = this.state;
      const newProps = {
        layout: classNames('A4_container', 'clearfix', { A4_container_large: !this.state.isSingle })
      };
      // console.log('page', currentPage, this.getCurrentScrollTop(), document.body.scrollHeight);
      return (
        <div className="swiper_container">
          <div className="swiper_header">
            <Row type="flex" justify="space-between">
              <Col span={8}>
                <Button border="none">相关文书</Button>
              </Col>
              <Col span={8} className="center">
                <Button.Group>
                  <Button type="primary" onClick={this.goPrev}>
                    <Icon type="left" />上一页
                  </Button>
                  <Button type="primary">
                    {currentPage + 1}/{total}
                  </Button>
                  <Button type="primary" onClick={this.goNext}>
                    下一页<Icon type="right" />
                  </Button>
                </Button.Group>
              </Col>
              <Col span={8} className="right">
                <Button.Group size="small">
                  <Button type="primary" onClick={this.onChangeLayout}>
                    {this.state.isSingle ? '双联' : '单联'}
                  </Button>
                  <Button type="primary" onClick={this.onSubmit}>保存</Button>
                  <Button type="primary">预览</Button>
                </Button.Group>
              </Col>
            </Row>
          </div>
          <BackTop />
          <WrappedComponent
            {...this.props}
            {...newProps}
            ref={(dom) => this.dom = dom}
          />
        </div>
      );
    }
  }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
