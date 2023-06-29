import React from 'react'
import './transition.css'
function Backdrop({isActive, onButtonClick}) {
  return (
    <div className={isActive?"backdrop backdrop-open":"backdrop"} onClick={onButtonClick}>
      
    </div>
  )
}

export default Backdrop
