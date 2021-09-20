import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Login from './components/Login';
import Success from './components/Success';

/*
const App = () => {
  return (
    <div>
      <Login />
    </div>
  );
}
*/

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          <div></div>
          <nav></nav>
        </header>
        <Switch>
          {
          //<Route exact path='/' component={Home} />
          }
          <Route path='/login' component={Login} />
          <Route path='/logsuccess' component={Success} />
          {
          //<Route path='/skills' component={Skills} />
          }
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
