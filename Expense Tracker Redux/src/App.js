import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import HomePage from './Components/Pages/HomePage';
import UpdateProfile from './Components/Pages/UpdateProfile';
import ForgotPassword from './Components/Pages/ForgotPassword';
import { useSelector } from 'react-redux';

function App() {

  const isLoggedIn=useSelector((state)=>state.authentication.isLoggedIn)

  const isDarkTheme=useSelector(state=>state.theme.isDarkTheme);

  return (
    <div className={isDarkTheme  ? "dark" : "App"}>
      <Switch>
        <Route path='/' exact>
        <SignUp/>
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/homepage'>
       {isLoggedIn &&<HomePage/>}
       {!isLoggedIn && <Redirect to='/login'></Redirect>}
      </Route>
      <Route path='/updateprofile'>
      {isLoggedIn &&<UpdateProfile/>}
       {!isLoggedIn && <Redirect to='/login'></Redirect>}
      </Route>
      <Route path='/forgotpassword'>
        <ForgotPassword/>
      </Route>
      </Switch>
    </div>
    );
}

export default App;
