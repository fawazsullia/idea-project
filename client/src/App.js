import React, {useState, useEffect, Suspense} from 'react'
import { Route, Switch } from 'react-router';
import * as appStyle from './app.module.css'
import DataLoading from './components/DataLoading';

function App() {

const Browse = React.lazy(()=> import('./views/Browse'))
const IdeaPage = React.lazy(()=> import('./views/IdeaPage'))
const Main = React.lazy(()=> import('./views/Main'))
const Submit = React.lazy(()=> import('./views/Submit'))
const Login = React.lazy(()=> import('./views/login'))
const AdminDashboard = React.lazy(()=> import('./views/admin/dashboard'))
const About = React.lazy(()=> import('./views/About'))


const [currentUser, setcurrentUser] = useState({ userName : "", signedIn: false, userType : "admin"});
const [isFetching, setisFetching] = useState(true)



useEffect(() => {
 fetch('https://ideaproject.herokuapp.com/', {
   credentials: 'include'
 })
 .then((response)=> response.json() )
 .then((data)=> {setcurrentUser(data); setisFetching(false)})
 .catch((err)=> {console.log(err)})
}, [])


const loginUser = (data)=>{
  setcurrentUser({userName: data.userName, signedIn: data.signedIn, userType : data.userType});
}


  
  return (


    <div className="App">
      <Switch>
<Suspense fallback={<DataLoading />}>
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
        <Login currentUser={currentUser} loginUser={loginUser} />
      </Route>

      <Route path="/admin/dashboard">
        <AdminDashboard currentUser={currentUser} isFetching={isFetching} />
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
