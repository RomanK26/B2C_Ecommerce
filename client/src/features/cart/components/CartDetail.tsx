import React from 'react'

const CartDetail = ({data}) => {
  return (
    <div>
        <div>{data.product_name}</div>
        <p>{data.quantity}</p>
        <p>{data.price}</p>
    </div>
  )
}

export default CartDetail