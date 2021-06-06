import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import * as ideaPageStyle from './styles/ideapage.module.css'
import {Link} from 'react-router-dom'
import Popup from '../components/Popup'


//Renders individual idea details, depending on the idea selected from /app/browse.
//Uses the id from parameter

function IdeaPage() {

    const [ideas, setideas] = useState(
        {
        title : "",
        author : "",
        description : ``,
        taken : false,
    }
    )

    //state for popup which triggers on 'mark taken' button
    const [popupVisible, setpopupVisible] = useState(false)

    //sets popup visible
    const popuptoggle = () => {
        setpopupVisible(true)

    }

    //closes popup from the closeup component
    const closePopup = () =>{
        setpopupVisible(false)
    }

    //fetch the id from url 
    const {id} = useParams()

    //on component mount
useEffect(() => {
    
    fetch(`/app/ideas/${id}`)
    .then((response)=> response.json())
    .then((data)=> {
        setideas(data)}
        )
        .catch(err => console.log(err));

        return() => { setideas({})    }

}, [])

    

    return (


        <div>

  
        {/* popup component */}

        { popupVisible && <Popup id={id} title={ideas.title} description={ideas.description} closePopup={closePopup} />}


<div className={ideaPageStyle.container}>

    <div className={ideaPageStyle.titlecontainer}><h2>"{ideas.title}"</h2></div>

        <div className={ideaPageStyle.backbtndiv}><Link style={{textDecoration: "none", color: "hsl(225, 46%, 32%)"}}  to="/app/browse">back</Link></div>

    <div className={ideaPageStyle.bodycontainer}>
        <div className={ideaPageStyle.descriptioncontainer}>
        <h2>Description</h2>
            <p>{ideas.description}</p>
        </div>
        <p style={{fontSize: "1.1rem", fontWeight: "700", marginTop: "25px"}}>By:</p>

        <div className={ideaPageStyle.authordetails}>
        <p className={ideas.name}>{ideas.name}</p>
        <p className={ideas.email}>{ideas.email}</p>
        <p className={ideas.social}><a href={ideas.social}>Link to Social</a></p>
        </div>

        <div className={ideaPageStyle.takenbtn}>
            <button type="button" onClick={popuptoggle}>Mark Taken</button>
        </div>
    </div>

</div> 
    

        </div> 
    )
}

export default IdeaPage
