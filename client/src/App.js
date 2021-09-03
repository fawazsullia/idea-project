import React, { useState, useEffect, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router";
import * as appStyle from "./app.module.css";
import DataLoading from "./components/DataLoading";
import Navbar from "./components/Navbar";

function App() {
  const Browse = React.lazy(() => import("./views/Browse"));
  const IdeaPage = React.lazy(() => import("./views/IdeaPage"));
  const Main = React.lazy(() => import("./views/Main"));
  const Submit = React.lazy(() => import("./views/Submit"));
  const Login = React.lazy(() => import("./views/login"));
  const AdminDashboard = React.lazy(() => import("./views/admin/dashboard"));
  const About = React.lazy(() => import("./views/About"));

  const [currentUser, setcurrentUser] = useState({
    userName: "Guest",
    signedIn: true,
    userType: "admin",
  });
  const [isFetching, setisFetching] = useState(true);

  useEffect(() => {
    fetch("https://ideaproject.herokuapp.com/", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setcurrentUser(data);
        setisFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const location = useLocation().pathname;
  let navBarVisible;
  if (
    location === "/" ||
    location === "/app/browse" ||
    location === "/about" ||
    location === "/app/submit" ||
    location === "/login"
  ) {
    navBarVisible = true;
  } else {
    navBarVisible = false;
  }

  const loginUser = (data) => {
    setcurrentUser({
      userName: data.userName,
      signedIn: data.signedIn,
      userType: data.userType,
    });
  };

  return (
    <div className="App">
      {navBarVisible && <Navbar user={currentUser} />}

      <Switch>
        <Suspense fallback={<DataLoading />}>
          {/* main page view*/}
          <Route exact path="/">
            <Main />
          </Route>

          {/* browse ideas here */}
          <Route path="/app/browse">
            <Browse />
          </Route>

          {/* Individual idea page. Access from browse */}
          <Route path="/app/ideas/:id">
            <IdeaPage />
          </Route>

          {/* Submit Ideas here */}
          <Route path="/app/submit">
            <Submit />
          </Route>

          <Route path="/login">
            <Login currentUser={currentUser} loginUser={loginUser} />
          </Route>

          <Route path="/admin/dashboard">
            <AdminDashboard currentUser={currentUser} />
          </Route>

          <Route path="/about">
            <About />
          </Route>
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
