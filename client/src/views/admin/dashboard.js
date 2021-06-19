import React, {useState, useEffect} from 'react'
import * as dashboardStyle from './styles/dashboard.module.css'
import {Link} from 'react-router-dom'
import DataLoading from '../../components/DataLoading';

function AdminDashboard({currentUser, isFetching}) {

    let access;

    if(currentUser.signedIn && currentUser.userType === "admin"){
         access = true
    }
    else {
        access = false
    }

const [pendingIdeas, setpendingIdeas] = useState([{}
])

//getting pending ideas
useEffect(() => {
    fetch('https://ideaproject.herokuapp.com/admin/dashboard')
    .then((response)=> response.json())
    .then((data)=> setpendingIdeas(data))
    .catch((err)=> console.log(err))

}, [])






const approveIdea =(e) => {

    fetch("https://ideaproject.herokuapp.com/admin/dashboard", {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({  id : e.target.value   })
    })
    .then((res)=> setpendingIdeas(pendingIdeas.filter((ideas)=> ideas._id !== e.target.value  )))

}

const deleteIdea = (e) => {

    fetch("https://ideaproject.herokuapp.com/admin/dashboard", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({  id : e.target.value   })
    })
    .then((res)=> setpendingIdeas(pendingIdeas.filter((ideas)=> ideas._id !== e.target.value  )))

}
    

{ 
    
    if(access){
    return(
        <div className={dashboardStyle.container}>

        <h3>Welcome Fawaz</h3>
        <Link to="/app/browse">Go to Browse</Link>
        <div className={dashboardStyle.innercontainer}>
            {pendingIdeas.map((ideas)=> {
                return(
                <div className={dashboardStyle.card}>
                <h3>{ideas.title}</h3>
                <p>{ideas.description}</p>
                <button type="button" value={ideas._id} onClick={approveIdea}>Approve</button>
                <button type="button" value={ideas._id} onClick={deleteIdea}>Delete</button>
                </div>)
            })}
        </div>

        </div>) }
        else { return(  <div className={dashboardStyle.oops}><h2>Oops</h2><p>You don't have access to this page.</p><p>Login as an admin to access.</p>
        <p><Link to="/">Return home</Link></p>
        
        
        </div>  ) }}

}
    


export default AdminDashboard
