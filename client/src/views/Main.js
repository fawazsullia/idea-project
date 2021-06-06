import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import * as mainStyle from './styles/main.module.css'

// Home page of the-idea-project
// No state is saved here
// No fetching from api here

 function Main() {



    return (
        <div>

      <Navbar />

          <div className={mainStyle.herocontainer}>

              <div className={mainStyle.heroinnercontainer}>

                  <div className={mainStyle.herotext}>
                      <h1>Find cool ideas for your next side project</h1>
                      <p>Looking for ideas for your next side project? Or have an idea but don't have time to build it? You are in the right place</p>
                        <Link to="app/submit" className={mainStyle.submitbtn}><button type="button">Submit Idea</button></Link>
                  </div>

                  <div className={mainStyle.heroimage}>
                    <object type="image/svg+xml" data="/images/hero.svg"></object>
                  </div>


              </div>

              <div className={mainStyle.arrowsection}>
                <p>Browse Ideas</p>
              <Link to="app/browse">
                <div>
                <img src="/images/arrow.svg" />
                </div>
                </Link> </div>
          </div>
        </div>
    )
}


export default Main;