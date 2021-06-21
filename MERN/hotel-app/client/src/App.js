// import react-router-dom
import { BrowserRouter, Switch, Route } from "react-router-dom";

// toast with css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// importing pages
import Home from "./booking/Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Dashboard from "./user dashboard/Dashboard";
import SellerDashboard from "./user dashboard/SellerDashboard";
import NewHotel from "./hotels/NewHotel";
import EditHotel from "./hotels/EditHotel";

// importing components
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer position="top-center" />

      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/login" component={Login} />

        <Route exact path="/signup" component={SignUp} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={SellerDashboard}
        />

        <PrivateRoute exact path="/hotels/new" component={NewHotel} />

        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
