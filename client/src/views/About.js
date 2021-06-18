import React from 'react'
import Navbar from '../components/Navbar'
import * as aboutStyle from './styles/about.module.css'

function HowitWorks() {
    return (
        <div>
        <Navbar />

        <section className={aboutStyle.container}>

        <div className={aboutStyle.what}>
        <h2>The What?</h2>
        <p>Idea Project is a free, non-profit idea sharing platform,
        started as a hobby project</p>
        <p>I was thinking of some cool ideas and realized that I have atleast 3 of them and 
        can't really build all.</p>
        <p>If this happened to me, I was pretty sure others did too</p>
        <p>This is why I built the platform</p>
        <p>As someone who's enthusiastic with building, I would rather see someone else build the idea than it
        it not being at all</p>
        <p>And I'm sure you have a similar perspective as well!</p>
        </div>

        <div className={aboutStyle.works}>
        <h2>How it works</h2>
        <p>You browse through the ideas list and if you like one, you mark it as taken</p>
        <p>Or if you have an idea you aren't building, submit it, so that someone else can pick it up.</p>
        <p>The rules are pretty simple:</p>
        <ul>
            <li>Make sure you actually can build the idea</li>
            <li>Mark the idea as taken</li>
            <li>Not sell the idea</li>
        </ul>
        <p>The project you build with the idea is owned by you and you do not have to credit the author.
         But a shoutout or mention would be a kind gesture.</p>
        </div>

        <div className={aboutStyle.contributors}>
        <h2>Contributors</h2>
        <h3>Fawaz Sullia (creator)</h3>
        <span ><a href="https://twitter.com/realfawazsullia">Twitter</a></span>
        <br /><br /><br />

        <p>Hey. I'm looking for contributors in development,marketing and design. If you are interested, hit me up on <a href="https://twitter.com/realfawazsullia">Twitter</a></p>
       
        </div>

        <div className={aboutStyle.coming}>
        <h2>Coming Up</h2>
        <p>I'll be adding more features in the future. Some of the ideas:</p>
        <ul>
        <li>Build a team/community to work on an idea</li>
        <li>Login to user account</li>
        <li>Track your progress in your dashboard</li>
        <li>Auto tweet your progress</li>    
        </ul>
</div>
         



        </section>
           <br /><br /> <br /> 
        </div>
    )
}

export default HowitWorks
