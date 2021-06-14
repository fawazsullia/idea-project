import React, {useState} from 'react'
import * as loginStyle from './styles/login.module.css'

function AdminLogin({loginUser}) {


    const authenticate = (res)=>{
if(res.userName){
        loginUser(res);
}
else { alert(res.message) }
    }

    const [loginDetails, setloginDetails] = useState({ userName: "", password: ""})

const handleLogin = ()=> {

const details = JSON.stringify(loginDetails)

fetch("https://ideaproject.herokuapp.com/auth/login", { method : "POST", headers : { 
    'Content-Type' : 'application/json'
},
body : details
})
.then((response)=> response.json())
.then((res)=> authenticate(res))
.catch((err)=>console.log(err))
}
    


    return (


        <div>
          <div className={loginStyle.container}>

<div className={loginStyle.innerContainer}>


<div className={loginStyle.contentContainer}>
   
        <h2>Admin login</h2>
   <form>
   <label forHTML="name">User Name:</label><br />
       <input type="text" name="name" value={loginDetails.userName} onChange={(e)=> setloginDetails({userName : e.target.value, password: loginDetails.password})} /><br />


    <label forHTML="password">Password</label><br />
       <input name="password" type="password" value= {loginDetails.password} onChange={(e)=> setloginDetails({ userName: loginDetails.userName , password : e.target.value})} /><br />


       <button type="button" onClick={handleLogin}>Login</button>


   </form>
   </div>
   </div>
</div>
        </div>
    )
}

export default AdminLogin
