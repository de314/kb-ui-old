import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'react-select/dist/react-select.css';

import Demo from './components/Demo'

import ActionFormDemo from './components/ActionFormDemo'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Demo} />
        <Route path="/forms" component={ActionFormDemo} />
      </div>
    </Router>
  );
}

export default App
