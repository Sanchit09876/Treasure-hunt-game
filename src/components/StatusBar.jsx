import React from 'react'

const StatusBar = ({balance, gameStatus, betAmount, currentMultiplier}) => {
  return (
    <div>
        <div>
            <p>Your Balance: {balance}</p>
            <p>Your Bet Amount: {betAmount}</p>
            <p>Your Current Multiplier: {currentMultiplier}</p>
            <p>Currently you can earn: {betAmount * currentMultiplier}</p>
            {gameStatus === 'lost' && <p>You Loose! Try Again</p>}
            {gameStatus === 'won' && <p>You Win! Congratulations!!!</p>}
        </div>
    </div>
  )
}

export default StatusBar