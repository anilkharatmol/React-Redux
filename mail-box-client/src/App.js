import SignUp from "./Components/SignUp";
import { Switch,Route } from "react-router-dom";

function App() {
  return (
    <div >
         <Switch>
        <Route path='/' exact>
        <SignUp/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
