import React, {Component} from 'react';
import './App.module.scss';
import Layout from '../src/containers/Layout/Layout'
import {BrowserRouter} from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <Layout >
          {/* some props */}
        </Layout>
      </BrowserRouter>
    )
  };
}

export default App;

