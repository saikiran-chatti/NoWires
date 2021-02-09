import React from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import FileExplorer from './components/FileExplorer/FileExplorer'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/explorer' exact component={FileExplorer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;