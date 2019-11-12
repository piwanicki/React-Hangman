import React, {Component} from 'react';
import './App.module.css';
import Layout from '../src/containers/Layout/Layout'
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateHighscoreBoard} from './actions';


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

const mapStateToProps = (state) => {
  return {
    highscore: state.highscore
  }
};

const mapDispatchToProps = { updateHighscoreBoard };

export const AppContainer = connect(mapStateToProps,mapDispatchToProps)(App);

