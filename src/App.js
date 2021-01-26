import { ThemeProvider } from '@material-ui/core';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomeComponent from './components/regular/home.component';
import LoginComponent from './components/regular/login.component';
import { AuthProvider } from './contexts/auth.context';
import './styles/styles.scss';

function App() {
  return (
    <ThemeProvider>
      <div id="your-awesome-app">
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={HomeComponent}/>
              <Route exact path="/login" component={LoginComponent}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
