import React from 'react'

const BetInput = ({betAmount, setBetAmount}) => {
  return (
    <div>
      <div>
         <input type="number" value={betAmount} onChange={(e)=>setBetAmount(Number(e.target.value))} placeholder="Place Bets" className='border'/>
      </div>
    </div>
  )
}

export default BetInput