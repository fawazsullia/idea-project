import React, {useState} from 'react'
import * as popupStyle from './styles/popup.module.css'

//collects data of the one who is interested in implementing the idea

function Popup({closePopup, id, title, description}) {

    const [userData, setuserData] = useState({ name: "", email: ""})

    //check if name is empty
    let nameEmpty = userData.name === "" ? true : false


    //check if email is empty or invalid
    let emailValid = function(){

        let emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[a-zA-Z]+$/ig
        if(userData.email !== "" && userData.email.match(emailRegex) ){
            return true
        }
        else { return false}

    }

    //mark idea as taken
const markTaken = (e) => {

if(nameEmpty || !emailValid()){
alert("A valid name and email required")

}

else{
e.preventDefault()

//sends details of idea and the person who picked up the idea
const userDetails = {
    name: userData.name,
    email: userData.email,
    title: title,
    description: description
}

fetch(`/app/ideas/${id}`, {
    method: "POST"
,
headers: {
    "Accept" : "application/json",
    "content-type" : "application/json" 
},
body : JSON.stringify(userDetails)
})
.then((res)=> res.json())
.then((res)=> console.log("done"))

alert("Congragulations! You can now start working on the idea. We have sent you an email with all the details about the idea. Please check spam folder in case you don't find it.")

setuserData({name:"", email: ""})

}
}


    return (
        <div className={popupStyle.container}>

        <div className={popupStyle.innerContainer}>

      <div><button className={popupStyle.popupclosebtn} type="button" onClick={closePopup}>X</button></div>
        
        
        <div className={popupStyle.contentContainer}>
           <p>Please agree to our terms and conditions below:</p>
           <ul>
           
        <li>I will try my best to complete the project</li>
           <li>I will not sell the idea as your own</li>
           </ul>
        
           <form>
           <label forHTML="name">Name:</label><br />
               <input name="name" style={{outline: nameEmpty ? "solid 1px red" : "solid 1px green"}} type="text" value={userData.name} onChange={(e) => setuserData({name: e.target.value, email: userData.email})} /><br />
               <div style={{height:"30px"}}>{  nameEmpty && <p style={{marginTop: "3px", color:"orange", fontSize:"0.8rem"}}>A valid name is required</p>     }</div>


            <label forHTML="email">Email:</label><br />
               <input name="email" style={{outline: !emailValid() ? "solid 1px red" : "solid 1px green"}} type="email" value={userData.email} onChange={(e) => setuserData({ name: userData.name, email: e.target.value  }) } /><br />
               <div style={{height:"25px"}}>{  !emailValid() && <p style={{marginTop: "3px", color:"orange", fontSize:"0.8rem"}}>A valid email is required</p>     }</div>


               <button type="button" onClick={markTaken}>Yes, I agree</button>


           </form>
           </div>
           </div>
        </div>
    )
}

export default Popup
