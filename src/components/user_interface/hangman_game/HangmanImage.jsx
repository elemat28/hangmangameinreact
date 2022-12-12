import React from 'react'

function HangmanImage({NumberOfLinesToDraw = 0}) {
  return (
    <div className='HangmanImage'>
        <p>Draw {NumberOfLinesToDraw} lines!</p>
    </div>

  )
}

export default HangmanImage