import React from 'react'
import Card from "./Card"

const CardRow = ({cards}) => {
  return (
    <div>
        {cards.map((type, index)=>{
            return <Card key={index} type={type} />
        })}
    </div>
  )
}

export default CardRow