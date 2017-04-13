import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css'
import 'react-select/dist/react-select.css'

import Demo from './components/Demo'

import ActionFormDemo from './components/ActionFormDemo'
import ActionViewDemo from './components/ActionViewDemo'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={() => (
          <ul>
            <li><Link to="/forms/action">Action Builder Form Demo</Link></li>
            <li><Link to="/forms/tasks">Task Builder Form Demo</Link></li>
            <li><Link to="/views/action">Action View Demo</Link></li>
            <li><Link to="/views/actions">Action Grid Demo</Link></li>
          </ul>
        )} />
        <Route path="/forms/action" component={ActionFormDemo} />
        <Route path="/views/action" component={ActionViewDemo} />
      </div>
    </Router>
  );
}

export default App
