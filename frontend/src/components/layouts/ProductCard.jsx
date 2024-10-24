import React from 'react'
import { Link } from 'react-router-dom'
import defaultImage from '../../assets/images/kolhapuritikhat 1.webp'


const ProductCard = ({product}) => {
  const productImage = product.images && product.images.length > 0 ? product.images[0].url : defaultImage
   
  return (
    <Link to={`/product/${product._id}`} className="w-56 md:m-5 flex-shrink-0 rounded-3xl bg-white hover:scale-105 transition-all duration-200 shadow-lg p-3">
      <div className="w-full h-40 rounded-xl flex items-center justify-center" style={{ backgroundColor: product.bgColor || '#FFFFFF' }}>
        <img src={productImage} alt={product.name} className="w-[80%] h-[80%] rotate-12 object-contain" />
      </div>
      <h1 className="font-bold md:text-[1rem] mt-2 text-[.9rem]">{product.name}</h1>
      <p className="text-xs text-zinc-700">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <h2 className="font-semibold">₹{product.price}</h2>
        <button className="rounded-full h-8 flex items-center justify-center w-8 bg-black text-white">
          <i className="ri-add-line"></i>
        </button>
      </div>
    </Link>
  )
}

export default ProductCard