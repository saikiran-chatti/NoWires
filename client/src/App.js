import React from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Header from './components/Header/Header'

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
