// @flow
import React from 'react';

import logo from './logo.svg';
import './App.css';

type Props = {
  children: any
};

const App = ({ children }: Props) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    {children}
  </div>
);

export default App;
