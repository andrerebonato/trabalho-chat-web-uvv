import React from 'react';
import { Header } from './components/Header/index';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>cornos</h1>
      <Header content="Hello world" isCorno hasColor />
    </div >
  );
}

export default App;
