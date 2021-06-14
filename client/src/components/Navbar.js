import React, {useState} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import * as navbarStyle from './styles/navbar.module.css' 

function Navbar() {

    const [navbarOpen, setnavbarOpen] = useState(false)


    const currentPage = useLocation()

    const toggleNavbar = ()=> {

        if(navbarOpen){
         setnavbarOpen(false)
        }
        else {   setnavbarOpen(true) }

    }

    return (
        
        <div className={navbarStyle.maincontainer}>

<nav className={navbarStyle.container}>

    <div><h2><NavLink style={{ color:"inherit", textDecoration: "none" }} to="/" exact>The Idea Project</NavLink></h2></div>
    
    <div className={navbarStyle.hamburger} onClick={toggleNavbar}>
    <ul>
    <li></li>
    <li></li>
    <li></li>
    </ul>
    </div>

    <div style={{ width : navbarOpen ? "200px" : "0px" }} className={navbarStyle.navcontainer}>

    <ul className={navbarStyle.navlist}>
    <li><NavLink to="/">Home</NavLink></li>
        <li>How it works</li>
        <li>About</li>
        <li className={navbarStyle.navbtn}>{
            
           currentPage.pathname !== "/app/submit" ? <NavLink to="/app/submit"><span>Submit</span></NavLink> : 
            <NavLink to="/app/browse"><span>Browse</span></NavLink>
           
           }</li> 
    </ul>
    </div>
</nav>


        </div>
    )
}

export default Navbar