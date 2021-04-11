import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { AuthContext } from './auth';
import AdminPage from './pages/AdminPage';
import { Button } from 'antd';
import DocumentationPage from './pages/Documenation/DocumentationPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ToDoPage from './pages/ToDoPage';
import PrivateRoute from './PrivateRoute';
function App() {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem("tokens") || '');

  const setTokens = (data: string) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  const getTokens = () => {
    let tokens = localStorage.getItem("tokens") || '';
    if (tokens) tokens = JSON.parse(tokens);
    return tokens;
  }

  const logout = () => {
    localStorage.setItem("tokens", '');
    setAuthTokens('');
  }

  return (

    <div className="App">
      {authTokens && <Button onClick={logout} style={{ margin: '5px' }}>logout</Button>}
      <AuthContext.Provider value={{ authTokens: getTokens(), setAuthTokens: setTokens }}>
        <Router>
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <PrivateRoute path="/todo" component={ToDoPage} />
            <Route path="/documentation" component={DocumentationPage} />
            <PrivateRoute path="/admin" component={AdminPage} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
