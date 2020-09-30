import React from "react";
import HomePage from "../components/HomePage";
import SignupPage from "../components/SignupPage";
import LoginPage from "../components/LoginPage";
import Header from "../components/Header";
import QuestionAnswer from "../components/QuestionAnswer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddQuestion from "../components/AddQuestion";
import SingleQuestion from "../components/SingleQuestion";
import AddAnswer from "../components/AddAnswer";

function NotFound() {
  return <h1>404 Page Not Found</h1>;
}

function Private(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <QuestionAnswer />
        </Route>
        <Route path="/login">
          <LoginPage updateLoggedInUser={props.updateLoggedInUser} />
        </Route>
        <Route path="/questions" exact>
          <QuestionAnswer
            updateLoggedInUser={props.updateLoggedInUser}
            isLoggedIn={props.isLoggedIn}
          />
        </Route>
        <Route path="/questions/add" exact>
          <AddQuestion
            updateLoggedInUser={props.updateLoggedInUser}
            isLoggedIn={props.isLoggedIn}
          />
        </Route>
        <Route path="/questions/:slug" exact component={SingleQuestion} />
        <Route path="/questions/:slug/answers/add" exact>
          <AddAnswer
            updateLoggedInUser={props.updateLoggedInUser}
            isLoggedIn={props.isLoggedIn}
          />
        </Route>
        <Route
          path="/questions/:slug/answers/:id"
          exact
          component={SingleQuestion}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
function Public(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <HomePage updateLoggedInUser={props.updateLoggedInUser} />
        </Route>
        <Route path="/login">
          <LoginPage updateLoggedInUser={props.updateLoggedInUser} />
        </Route>
        <Route path="/register">
          <SignupPage updateLoggedInUser={props.updateLoggedInUser} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

class App extends React.Component {
  state = {
    isLoggedIn: false,
  };
  componentDidMount() {
    let token = localStorage.getItem("Token");
    if (token) {
      this.updateLoggedInUser(true);
    }
  }
  updateLoggedInUser = (value) => {
    this.setState({ isLoggedIn: value });
  };

  render() {
    var  isLoggedIn  = this.state.isLoggedIn;
    return (
      <>
        <BrowserRouter>
          <Header
            updateLoggedInUser={this.updateLoggedInUser}
            isLoggedIn={isLoggedIn}
          />
          {this.state.isLoggedIn ? (
            <Private
              updateLoggedInUser={this.updateLoggedInUser}
              isLoggedIn={isLoggedIn}
            />
          ) : (
            <Public
              updateLoggedInUser={this.updateLoggedInUser}
              isLoggedIn={isLoggedIn}
            />
          )}
        </BrowserRouter>
      </>
    );
  }
}

export default App;
