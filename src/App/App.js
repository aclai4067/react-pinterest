import React from 'react';
import firebase from 'firebase/app';

import './App.scss';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNav from '../components/MyNav/MyNav';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
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

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <MyNav authed={authed} />
          {
            (authed) ? (<div>You Logged In </div>) : (<Auth />)
          }
      </div>
    );
  }
}

export default App;
