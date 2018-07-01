import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './assets/logo.svg';
import './App.css';

import pageSwiper from './pageSwiper';

class App extends Component {
  render() {
    return (
      <Router>
        {/*<Route path="/" component={Home} />*/}
        <Route exact path="/" component={pageSwiper} />
        {/*<Route path="/topics" component={Topics} />*/}
      </Router>
    );
  }
}

export default App;
