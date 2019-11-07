import React from 'react'

import Routes from './routes'

import logo from './assets/logo.svg'
import './App.css';

function App() {

  return (
    <div className="container">
      <a href="/dashboard"><img className="logo" src={ logo } alt="logo"/></a>

      <div className="content">
        <Routes />
      </div>

    </div>
  );
}

export default App;
