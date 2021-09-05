import React, { useState, useEffect, Suspense, useRef } from "react";
import { Route, Switch, useLocation } from "react-router";
import DataLoading from "./components/DataLoading";
import Navbar from "./components/Navbar";



function App() {
  const Browse = React.lazy(() => import("./views/Browse.js"));
  const IdeaPage = React.lazy(() => import("./views/IdeaPage.js"));
  const Main = React.lazy(() => import("./views/Main.js"));
  const Submit = React.lazy(() => import("./views/Submit.js"));
  const Login = React.lazy(() => import("./views/login.js"));
  const AdminDashboard = React.lazy(() => import("./views/admin/Dashboard.js"));
  const About = React.lazy(() => import("./views/About.js"));

  const [currentUser, setcurrentUser] = useState({
    userName: "Guest",
    signedIn: true,
    userType: "admin",
  });
  

  useEffect(() => {
    fetch("https://ideaproject.herokuapp.com/", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setcurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });

      return ()=> { setcurrentUser({})   }
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

  //ref to track clicks on App component
const appRef = useRef(null);


  return (
    <div className="App" ref={appRef}>
      
      {navBarVisible && <Navbar user={currentUser} appRef = {appRef} />}

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
