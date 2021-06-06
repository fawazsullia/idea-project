import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import * as navbarStyle from './styles/navbar.module.css' 

function Navbar() {

    const currentPage = useLocation()

    return (
        
        <div className={navbarStyle.maincontainer}>

<nav className={navbarStyle.container}>

    <div><h2><NavLink style={{ color:"inherit", textDecoration: "none" }} to="/" exact>The Idea Project</NavLink></h2></div>
    
    <div className={navbarStyle.navcontainer}>
    <ul className={navbarStyle.navlist}>
        <li>How it works</li>
        <li>About</li>
        <li className={navbarStyle.navbtn}>{
            
           currentPage.pathname !== "/app/submit" ? <NavLink to="/app/submit"><button type="button">Submit</button></NavLink> : 
            <NavLink to="/app/browse"><button type="button">Browse</button></NavLink>
           
           }</li> 
    </ul>
    </div>
</nav>


        </div>
    )
}

export default Navbar