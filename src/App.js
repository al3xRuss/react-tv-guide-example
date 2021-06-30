import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import Admin from "./components/admin.component";
import ShowsList from "./components/guide-list.component";
import { history } from "./helpers";
import { alertActions } from "./actions/alert.actions";
import { PrivateRoute } from "./components/privateroute.component";
import { LoginPage } from "./components/login.component";
import { RegisterPage } from "./components/register.component";
import { userActions } from "./actions/user.actions";

class App extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
        // clear alert on location change
        this.props.clearAlerts();
    });
}
  render() {
    const { alert, user } = this.props;
    return (
      <Router history={history}>
        
        <Navbar collapseOnSelect fixed="top" expand="small" bg="dark" variant="dark">
          <Container>
            <Nav.Link href="/guide" className="navbar-brand">
              Digital TV Guide
            </Nav.Link>
            <Nav.Link href="/guide">Shows</Nav.Link>
            { user && user.userType === "administrator" && <Nav.Link href="/admin">Manage Users</Nav.Link>}
            { user && <Nav.Link href="/login">Logout</Nav.Link> }
          </Container>
        </Navbar>

        <div className="container mt-5 w-100 mx-auto">
          <Switch>
            <PrivateRoute exact path={["/", "/guide"]} component={ShowsList} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route exact path="/admin" component={Admin} />
            <Redirect from="*" to="/" />
          </Switch>
          {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
          }
        </div>
      </Router>
    );
  }
}

function mapState(state) {
  const { alert, authentication } = state;
  const { user } = authentication;
  return { alert, user };
}

const actionCreators = {
  getUsers: userActions.getAll,
  clearAlerts: alertActions.clear
};


export default connect(mapState, actionCreators)(App);
