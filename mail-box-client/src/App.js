import SignUp from "./Components/SignUp";
import { Switch,Route, Redirect } from "react-router-dom";
import Login from "./Components/Login";
import HomePage from "./Pages/HomePage";
import { useSelector } from "react-redux";
import Inbox from "./Pages/Inbox";
import ForgotPassword from "./Components/ForgotPassword";
import InboxMessages from "./Pages/InboxMessages";
import Sent from "./Pages/Sent";
import SentMessages from "./Pages/SentMessages";

function App() {

  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn);
  const showInbox=useSelector(state=>state.auth.showInbox);
  const showSent=useSelector(state=>state.auth.showSent);
  
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
       {!isLoggedIn && <Redirect to='/login'/>}
      </Route>
      <Route path='/inbox'>
        {isLoggedIn &&<Inbox/>}
        {!isLoggedIn && <Redirect to='/login'/>}
      </Route>
      <Route path='/sent'>
      {isLoggedIn &&<Sent/>}
        {!isLoggedIn && <Redirect to='/login'/>}
      </Route>
      <Route path='/forgotpassword'>
      <ForgotPassword/>
      </Route>
      <Route path="/:id">
        {showInbox && <InboxMessages/>}
        {showSent &&<SentMessages/>}
      </Route>
      </Switch>
    </div>
  );
}

export default App;
