import React from 'react';
import Joke from './components/Joke'
import NavBar from './components/NavBar'

// Yellow: #ffea00
// Grey: 2e3133
// Black: 181a1b

function App() {
  return (
    <div className="App" style={{background: '181a1b', border: '2px solid red', width: '80%', margin: '0 auto'}}>
      <NavBar />
      <Joke />
    </div>
  );
}

export default App;
