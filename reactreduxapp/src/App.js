import React from 'react';
import Joke from './components/Joke'
import NavBar from './components/NavBar'

import './App.css'

function App() {
  return (
    <div className="App" style={{backgroundColor: 'rgb(24,26,27)', width: '80%', margin: '0 auto', color:'white'}}>
      <NavBar />
      <Joke />
    </div>
  );
}

export default App;
