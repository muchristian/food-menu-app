import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/menu" component={Home} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
