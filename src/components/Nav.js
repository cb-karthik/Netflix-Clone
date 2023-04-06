import React, { useEffect, useState } from 'react'
import './Nav.css';


function Nav() {
  const [show, handleShow]=useState(false)
    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return ()=> {
            window.removeEventListener("scroll",null) //requires null to work beacuse removwEventListener needs 2 arguments
        }
  },[]);
  
    return (
    <div className={`nav ${show && "nav_black"}`}>
        <img className='nav_logo'  src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"  alt="Netflix Logo" />
        <img className='nav_avatar'  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO8Qi_x0gnMhAsYjBteaFqsg1kr7xkMHJKbCQaBBwN-w&usqp=CAU&ec=48665701" alt="AvatarLogo" />
    </div>
  )
} 

export default Nav