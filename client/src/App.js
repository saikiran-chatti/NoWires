import React from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import FileExplorer from './pages/FileExplorer/FileExplorer'
import About from './pages/About/About';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/' exact component={Home} />
          <Route path='/explorer' exact component={FileExplorer} />
          <Route path='/about' exact component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;