import '../App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './login/SignUp';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import ForgotPassword from './login/ForgotPassword';
import NewStockEntry from './stocks/NewStockEntry';

function App() {
  return (
    // <Container className="d-flex align-items-center justify-content-center"
    //   style={{ minHeight: "100vh" }}>
    //   <div className="w-100" style={{ maxWidth: "400px" }}>
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/new-entry" component={NewStockEntry} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
    //   </div>
    // </Container>
  );
}

export default App;
