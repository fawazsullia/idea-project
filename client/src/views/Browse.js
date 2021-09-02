import React, {useState, useEffect} from 'react'
import * as browseStyle from './styles/browse.module.css'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import DataLoading from '../components/DataLoading'


// Path: /app/browse
// Displays all the available ideas in descending order of created date
// Doesn't display if the idea is taken

function Browse() {

   

    const [ideas, setideas] = useState([])
    const [currentCount, setcurrentCount] = useState(16)
    const [loading, setloading] = useState(true)

// On component render fetch data from server

    useEffect( () => {

        //fetch the data from server
fetch('https://ideaproject.herokuapp.com/app/browse?count=16')
.then((response)=> response.json())
.then((data)=> {

        //set the received data as the state
setideas(data);
setloading(false)

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
.then((data) => {setideas(data);  setloading(false)})
.catch((err)=> console.log(err))


}

if(loading){  return (  <> 
    <Helmet>
<title>Browse Ideas | Idea Project</title>
<meta name="description" content="Browse from our list of ideas and start working on that project!" />
</Helmet><DataLoading />
</> )    }

else{ 


    return (
        <>

        <div>
        

        <Helmet>
<title>Browse Ideas | Idea Project</title>
<meta name="description" content="Browse from our list of ideas and start working on that project!" />
</Helmet>

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
        </>
    )
                 }
}

export default Browse
