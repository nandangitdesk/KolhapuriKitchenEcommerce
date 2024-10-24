import React from 'react'
import { Link } from 'react-router-dom'

const CartItemCard = ({item,deleteCartItems}) => {
 
  return (
    <div className="flex items-center justify-between p-4 max-w-sm md:max-w-lg lg:w-[17.5rem] mx-auto mb-4" style={{maxHeight: '200px', overflow: 'hidden'}}>
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded mr-4" />
        <div>
          <Link to={`/product/${item.product}`} className="text-[1rem] font-semibold ">{item.name}</Link>
          <p className="text-xs text-gray-600 ">Price: ₹{item.price}</p>
          <p onClick={()=>deleteCartItems(item.product)} className='text-red-400 cursor-pointer text-sm hover:text-red-600'>Remove</p>
        </div>
      </div>
    
    </div>
  )
}

export default CartItemCard