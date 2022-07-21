import React from 'react'
import Login from './Login'
import SignUp from'./SignUp';


function Introduction() {
  return (<div className='overall'>
    <div className='intro'>
        <h1>Appointment Manager</h1>
    <div className='login'><Login/></div><p></p>
    <div className='signup'><SignUp/></div>
    </div></div>
  )
}

export default Introduction