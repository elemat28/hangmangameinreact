import React from 'react'

function Word({arrayOfCharacters}) {
  return (
    <div className='HangmanWord'>
        {arrayOfCharacters}
    </div>

  )
}

export default Word