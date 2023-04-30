import SignUp from "./Components/SignUp";
import { Switch,Route, Redirect } from "react-router-dom";
import Login from "./Components/Login";
import HomePage from "./Pages/HomePage";
import { useSelector } from "react-redux";

function App() {

  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn);
  
  return (
    <div >
         <Switch>
        <Route path='/' exact>
        <SignUp/>
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/homepage'>
       {isLoggedIn && <HomePage/>}
       {!isLoggedIn && <Redirect to='/'/>}
      </Route>
      </Switch>
    </div>
  );
}

export default App;
