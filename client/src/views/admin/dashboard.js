import React, {useState, useEffect} from 'react'
import * as dashboardStyle from './styles/dashboard.module.css'
import {Link} from 'react-router-dom'

function AdminDashboard({currentUser}) {

   const {loggedIn, admin} = currentUser

const [pendingIdeas, setpendingIdeas] = useState([
    {title : "ajdbhausbdas", description: "dsadajdsaasaashjduadjuansd saduand sjadnaudn asudnaudn uasdaund sadnaudn usadnaun", 
    isValidated : "false"}
])

//getting pending ideas
useEffect(() => {
    fetch('https://ideaproject.herokuapp.com/admin/dashboard')
    .then((response)=> response.json())
    .then((data)=> console.log(data))
    .catch((err)=> console.log(err))

}, [])






const approveIdea =() => {

}

const deleteIdea = () => {

}
    

{ if(loggedIn && admin){
    return(
        <div className={dashboardStyle.container}>

        <h3>Welcome Fawaz</h3>
        <div className={dashboardStyle.innercontainer}>
            {pendingIdeas.map((ideas)=> {
                return(
                <div className={dashboardStyle.card}>
                <h3>{ideas.title}</h3>
                <p>{ideas.description}</p>
                <button type="button" onClick={approveIdea}>Approve</button>
                <button type="button" onClick={deleteIdea}>Delete</button>
                </div>)
            })}
        </div>

        </div>) }
        else { return(  <div className={dashboardStyle.oops}><h2>Oops</h2><p>You don't have access to this page.</p><p>Login as an admin to access.</p>
        <p><Link to="/">Return home</Link></p>
        
        </div>  ) }
}
    
}

export default AdminDashboard
