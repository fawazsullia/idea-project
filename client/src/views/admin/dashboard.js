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

const [pendingIdeas, setpendingIdeas] = useState([
])
const [fetching, setfetching] = useState(true)
console.log(pendingIdeas.length)
//getting pending ideas
useEffect(() => {

    fetch('https://ideaproject.herokuapp.com/admin/dashboard')
    .then((response)=> {response.json();})
    .then((data)=> {setpendingIdeas(data) ;   setfetching(false)} )
    .catch((err)=> {console.log(err); setfetching(false)})

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

    fetch(`https://ideaproject.herokuapp.com/admin/dashboard/${e.target.value}`, {
        method : "DELETE"
    })
    .then((res)=> setpendingIdeas(pendingIdeas.filter((ideas)=> ideas._id !== e.target.value  )))

}
    

{ 
    
    if(access){
        if(fetching){ 
           return <DataLoading />
        }
        else {
    return(
        <div className={dashboardStyle.container}>
<div className={dashboardStyle.heading}>
        <h2>Welcome <span style={{ fontStyle: "italic", color: "salmon" }}>{currentUser.userName}</span></h2>
        <Link to="/app/browse">Go to Browse</Link>
        </div>

       

      { pendingIdeas.length ?  <div className={dashboardStyle.innercontainer}>
            { 

            pendingIdeas.map((ideas)=> { 
               
                return(
                <div className={dashboardStyle.card}>
                <h3>{ideas.title}</h3>
                <p>{ideas.description}</p>
                <button type="button" value={ideas._id} onClick={approveIdea}>Approve</button>
                <button type="button" value={ideas._id} onClick={deleteIdea}>Delete</button>
                </div>)
            })}
        </div> : <p className={dashboardStyle.nopending}>No ideas to approve right now. Wait for someone to submit an idea</p> }

        

        </div>) }}
        else { return(  <div className={dashboardStyle.oops}><h2>Oops</h2><p>You don't have access to this page.</p><p>Login as an admin to access.</p>
        <p><Link to="/">Return home</Link></p>
        
        
        </div>  ) }}

}
    


export default AdminDashboard
