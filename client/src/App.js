import React, { Fragment } from 'react';
import './App.css';
import Navbar from './component/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/pages/Home';
import About from './component/pages/About';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Alerts from './component/layout/Alerts';
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState'
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './component/routing/PrivateRoute'

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return ( 
  <AuthState>
    <ContactState>
      <AlertState>
        <Router>
          <Fragment >
          <Navbar />
            <div className ="container" >
              <Alerts />
              <Switch>
                <PrivateRoute exact path = '/' component = {Home} /> 
                <Route exact path = '/about' component = {About}/> 
                <Route exact path = '/register' component = {Register}/> 
                <Route exact path = '/login' component = {Login}/> 
              </Switch > 
            </div> 
          </Fragment> 
        </Router>
      </AlertState>
    </ContactState>
  </AuthState>
  );
}

export default App;