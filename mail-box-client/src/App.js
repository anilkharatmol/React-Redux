import SignUp from "./Components/SignUp";
import { Switch,Route } from "react-router-dom";
import Login from "./Components/Login";
import HomePage from "./Pages/HomePage";

function App() {
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
        <HomePage/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
