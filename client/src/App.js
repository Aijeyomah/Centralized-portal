import React, { useState} from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./Context/auth";
import ApplicantSignUp from './Components/auth/Applicant/Signup/ApplicantSignUp';
import Dashboard from './Components/dashboard/Applicant/DashBoard';
import AdminDashboard from './Components/dashboard/Admin/AdminDashBoard';
import ApplicationForm from './Components/auth/Applicant/ApplicationForm/ApplicationForm';
import LandingPage from './Components/auth/Applicant/landing/landing';
import AdminLogin from './Components/auth/Admin/adminLogin/adminLogin';
import Login from './Components/auth/Applicant/login/login';
import ForgotPassword from './Components/auth/Applicant/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/auth/Applicant/ForgotPassword/ResetPassword'

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
    console.log(data);
  }
  
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <BrowserRouter>
      <div className="App">
        <Route exact path="/signup" render={() => <ApplicantSignUp />} />
        <PrivateRoute exact path="/applicationform" component={ApplicationForm} />
        <PrivateRoute path="/applicantdashboard" component={Dashboard} />
        <PrivateRoute path="/admindashboard" component={AdminDashboard} />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/admin/login' component={AdminLogin} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgotpassword' component={ForgotPassword} />
        <Route exact path='/resetpassword' component={ResetPassword} />
      </div>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
