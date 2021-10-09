// Imported styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/styles/App.css";

//Imported router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Imported components
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import Trains from "./components/pages/Trains";
import Payment from "./components/pages/Payment";
import MoreInfo from "./components/pages/MoreInfo";
import Profile from "./components/pages/Profile";
import Ticket from "./components/pages/Ticket";
import Admin from "./components/pages/Admin";
import ProtectedRouter from "./ProtectedRouter";

function App() {


  return (
    <Router>
      <div className="App">
        
        <Switch>
          {/*Non-protected routes*/}
          <Route exact path="/" component={Login} />
          <Route exact path="/create" component={CreateAccount} />

          {/*Protected routes*/}
          <ProtectedRouter path="/trains" component={Trains} />
          <ProtectedRouter exact path="/moreInfo" component={MoreInfo} />
          <ProtectedRouter exact path="/profile" component={Profile} />
          <ProtectedRouter exact path="/payment" component={Payment} />
          <ProtectedRouter exact path="/ticket" component={Ticket} />
          <ProtectedRouter exact path="/admin" component={Admin} />

          {/*404 Page*/}
          <Route path="*">
            <div style={{ marginTop: "300px" }}>
              <link
                href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
                rel="stylesheet"
                id="bootstrap-css"
              />
              <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
              <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

              <div
                class="d-flex justify-content-center align-items-center"
                id="main"
              >
                <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center">
                  404
                </h1>
                <div class="inline-block align-middle">
                  <h2 class="font-weight-normal lead" id="desc">
                    The page you requested was not found.
                  </h2>
                </div>
              </div>
            </div>
            <a href="/" style={{ color: "white" }}>
              Return to login page
            </a>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
