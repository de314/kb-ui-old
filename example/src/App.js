import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import 'react-select/dist/react-select.css'

import ActionFormDemo from './components/ActionFormDemo'

import ActionViewDemo from './components/ActionViewDemo'
import ActionsViewDemo from './components/ActionsViewDemo'

import InMemProviderDemo from './components/ImMemoryProviderDemo'
import PaginatedCompDemo from './components/PaginatedCompDemo'

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
            <li><Link to="/providers/mem">In Mem Provider Demo</Link></li>
            <li><Link to="/views/paged">Paged Table Demo</Link></li>
          </ul>
        )} />
        <Route path="/forms/action" component={ActionFormDemo} />

        <Route path="/views/action" component={ActionViewDemo} />
        <Route path="/views/actions" component={ActionsViewDemo} />
        <Route path="/providers/mem" component={InMemProviderDemo} />
        <Route path="/providers/paged" component={PaginatedCompDemo} />
      </div>
    </Router>
  );
}

export default App
