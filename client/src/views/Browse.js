import React, {useState, useEffect} from 'react'
import * as browseStyle from './styles/browse.module.css'
import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'


// Path: /app/browse
// Displays all the available ideas in descending order of created date
// Doesn't display if the idea is taken

function Browse() {

   

    const [ideas, setideas] = useState([])
    const [currentCount, setcurrentCount] = useState(16)

// On component render fetch data from server

    useEffect( () => {

        //fetch the data from server
fetch('https://ideaproject.herokuapp.com/app/browse?count=16')
.then((response)=> response.json())
.then((data)=> {

        //set the received data as the state
setideas(data)

})
.catch((err)=> console.log(err))

}, [])

// function that is fired when users click in button 'more'

const clickedMore = () => {
let count = currentCount + 16
setcurrentCount(count)

// Fetching 16 more ideas

fetch(`app/browse?count=${currentCount}`)
.then((response) => response.json())
.then((data) => setideas(data))
.catch((err)=> console.log(err))


}


    return (

        <div>

        <Navbar />

         <section className={browseStyle.container}> 
             <div>
               
             </div>

             <div className={browseStyle.cardscontainer}>
                 {
                     ideas.map((idea)=> 
                     <div className={browseStyle.card}><Link style={{textDecoration: "none", color: "white"}} to={`/app/ideas/${idea._id}`}>
                        <div>
                        <div className={browseStyle.title}><p>" {idea.title} "</p></div>
                        <div className={browseStyle.btndiv}></div>
                        </div></ Link>
                    </div>
                 
                 )}
             </div>
                 
                    
             <div className={browseStyle.morebtn}>
                 <button type="button" onClick={clickedMore}>More</button>
             </div>
                    
         </section>
        </div>
    )
}

export default Browse
