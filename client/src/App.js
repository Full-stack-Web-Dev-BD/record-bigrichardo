import React, { useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import { Provider } from 'react-redux';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';



import validators from './common/validators';
import store from './store';
import {
  Account,
  SignUp as SignUpView,
} from './views';
import { Main as MainLayout } from './layouts';
import { RouteWithLayout } from './components';
import Login from 'views/Login/Login';
import Home from 'views/Home/Home'
import Create from 'views/Create/Create'
import Library from 'views/Library/Library'
import Upgrade from 'views/Upgrade/Upgrade'
import Help from 'views/Help/Help'


const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/';
  }
}


const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {

    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      setUser(decoded)
    }
  }, [])




  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route exact path="/" component={Login} />
          <Route exact path="/sign-up" component={SignUpView} />
          <Switch>
            <RouteWithLayout
              component={Home}
              exact
              layout={MainLayout}
              path="/home"
            />
          </Switch>
          <Switch>
            <RouteWithLayout
              component={Create}
              exact
              layout={MainLayout}
              path="/create"
            />
          </Switch>
          <Switch>
            <RouteWithLayout
              component={Library}
              exact
              layout={MainLayout}
              path="/library"
            />
          </Switch>
          <Switch>
            <RouteWithLayout
              component={Upgrade}
              exact
              layout={MainLayout}
              path="/upgrade"
            />
          </Switch>
          <Switch>
            <RouteWithLayout
              component={Help}
              exact
              layout={MainLayout}
              path="/help"
            />
          </Switch>
          <Switch>
            <RouteWithLayout
              component={Account}
              exact
              layout={MainLayout}
              path="/account"
            />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}
export default App;