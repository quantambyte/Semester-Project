
// import react-router-dom
import { BrowserRouter , Switch, Route } from 'react-router-dom'

// toast with css
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// importing pages
import Home from './booking/Home'
import Login from './auth/Login'
import SignUp from './auth/SignUp'

// importing components
import NavBar from './components/NavBar'


function App() {
  return (
    <BrowserRouter>

      <NavBar /> 
      <ToastContainer position = 'top-center' />

      <Switch>
        <Route exact path= '/' component = {Home} />
      </Switch>

      <Switch>
        <Route exact path= '/login' component = {Login} />
      </Switch>

      <Switch>
        <Route exact path= '/signup' component = {SignUp} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
