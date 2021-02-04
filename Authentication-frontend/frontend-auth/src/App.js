import {BrowserRouter, Switch, Route} from "react-router-dom";
import SignIn from './components/signIn/signIn.js';
import SignUp from './components/signUp/signUp.js';
import Dashboard from './components/dashboard/dashboard.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
