import React, {useState, useEffect, Suspense} from 'react'
import { Route, Switch } from 'react-router';
import * as appStyle from './app.module.css'
import AdminDashboard from './views/admin/dashboard';

function App() {

const Browse = React.lazy(()=> import('./views/Browse'))
const IdeaPage = React.lazy(()=> import('./views/IdeaPage'))
const Main = React.lazy(()=> import('./views/Main'))
const Submit = React.lazy(()=> import('./views/Submit'))
const Login = React.lazy(()=> import('./views/login'))


const [currentUser, setcurrentUser] = useState({ userName : "", loggedIn: false, userType : "user"});

useEffect(() => {
 fetch('https://ideaproject.herokuapp.com/')
 .then((response)=> response.json() )
 .then((data)=> setcurrentUser(data))
}, [])


  
  return (


    <div className="App">
      <Switch>
<Suspense fallback={<h2>Loading...</h2>}>
{/* main page view*/ }
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
        <Login currentUser={currentUser} />
      </Route>

      <Route path="/admin/dashboard">
        <AdminDashboard currentUser={currentUser} />
      </Route>

</Suspense>
      </Switch>
    </div>
  );
}

export default App;
