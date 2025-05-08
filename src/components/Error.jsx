import React from 'react'

function Error({message}) {
    console.log("mes",message)
  return (
    
      <div className='errorContainer'>
      <p className='text'>{message?.toString()}</p>
    </div>
    
  )
}

export default Error
