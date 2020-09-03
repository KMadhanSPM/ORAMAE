import React, { Component } from 'react';
import Leaderboard from './LeaderBoard';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <Leaderboard />
      </>
    );
  }
}

export default App;
