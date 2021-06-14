import React, {useState} from 'react'
import * as submitformStyle from './styles/submit.module.css'
import Navbar from '../components/Navbar'


//form to submit idea
//contains post request on /app/ideas/:id path

function Submit(){

  

//state for idea title, idea description, user name, user email, user social link

    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [social, setsocial] = useState("")

    let nameEmpty = name === "" ? true : false
    let titleEmpty = title === "" ? true : false
    let descriptionEmpty = description === "" ? true : false


    
//on form submit
    function submitForm(e){

        e.preventDefault();

        if(titleEmpty && descriptionEmpty &&nameEmpty){

alert("Title, description and name are required")

        }
        else{

        //from states
        const ideaDetails = {
            title : title,
            description: description,
            name: name,
            email: email,
            social: social,
            taken: false
        }
//fetch post
 fetch("https://ideaproject.herokuapp.com/app/submit", {
    method: "POST",
    headers: {
        "Accept" : "application/json",
        "content-type" : "application/json" 
    },
    body: JSON.stringify(ideaDetails)

})
.then((res)=> alert(`Your idea has been Submitted.
Thank You :)`))


settitle("")
setdescription("")
setname("")
setemail("")
setsocial("")
        }
    }
    //form submit ends here






    return(

<div>

<Navbar />


<div className={submitformStyle.container}>

<div className={submitformStyle.formcontainer}>
<h2>Submit your idea here</h2>
<form>

<div className={submitformStyle.left}>

<label>Your idea in short:</label>
<textarea className={submitformStyle.title} placeholder="Ex: Book meals and table in advance" value={title} onChange={(e) => settitle(e.target.value)} type="text" maxLength="100" name="ideaTitle" />
<br />

<label>Describe your idea in &lt; 200 words:</label>
<textarea  className={submitformStyle.description} placeholder="Ex: A few days ago, I went out to have dinner with my spouse. We had to wait for ......" value={description} onChange={(e) => setdescription(e.target.value)} maxLength="1000" minLength="200" name="ideaDescription" />

<br />

</div>

<div className={submitformStyle.right}>
    <label className={submitformStyle.name}>Name:
        <input type="text" value={name} placeholder="John Doe" onChange={(e) => setname(e.target.value)} name="name"/>
    </label>

    <br />

    <label className={submitformStyle.email}>Email:
        <input type="email" placeholder="example@yourdomain.com" value={email} onChange={(e) => setemail(e.target.value)} name="email" />
    </label>
    <br />

    <label className={submitformStyle.social}>Social Media Link:
        <input type="url" value={social} placeholder="https://www.twitter.com/user_name" onChange={(e) => setsocial(e.target.value)} name="twitter" />
    </label>
    <br />
    <button type="submit" onClick={submitForm}>Submit Idea</button>

</div>

    
</form>

</div>

</div>
</div>

)

}

export default Submit