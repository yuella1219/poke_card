import React from 'react'
// import ReactDom from 'react-dom'
import logo from './logo.svg';
import './App.css';
import { POKE_DATA } from './api/poke-api.ts';
import { ScreenCardList } from './screen/index.js';

function App() {
  return (
    <div className="dark-screen">
      <ScreenCardList/>
    </div>
  );
}

export default App;
