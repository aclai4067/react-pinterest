import React from 'react';
import firebase from 'firebase/app';

import './App.scss';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNav from '../components/MyNav/MyNav';
import BoardsContainer from '../components/BoardsContainer/BoardsContainer';
import SingleBoard from '../components/SingleBoard/SingleBoard';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    selectedBoardId: null,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  setSingleBoard = (boardId) => {
    this.setState({ selectedBoardId: boardId });
  };

  render() {
    const { authed, selectedBoardId } = this.state;
    return (
      <div className="App">
        <MyNav authed={authed} />
          {
            (authed) ? (<BoardsContainer setSingleBoard={this.setSingleBoard} />) : (<Auth />)
          }
        {
          (selectedBoardId) && (<SingleBoard selectedBoardId={selectedBoardId} setSingleBoard={this.setSingleBoard} />)
        }
      </div>
    );
  }
}

export default App;
