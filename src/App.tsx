import React from 'react';
import logo from './logo.svg';
import './App.css';
import { items } from './store/items';
import { observer } from 'mobx-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Main } from './screens/main';
import { CustomNavbar } from './components/navbar';
import { CodeEditor } from './screens/CodeEditor';
import { ToastComponent } from './components/toast';
import { auth } from './store/auth';
import Login from './screens/Login';


@observer
class App extends React.Component {
  render() {
    console.log(auth.authToken)
    return (
      <Router>
        {auth.authToken ?
          <div className="App">
            <CustomNavbar />
            <ToastComponent />

            <Switch>
            <Route path="/">
                <Main />
              </Route>
              <Route path="/main">
                <Main />
              </Route>
            </Switch>

          </div>
          :
          <Login />
        }
      </Router>
    );
  }
}

export default observer(App);
