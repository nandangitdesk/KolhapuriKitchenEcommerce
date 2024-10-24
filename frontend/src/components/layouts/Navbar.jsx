import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'; 
import navLogo from '../../assets/images/navlogodesktop.jpg'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navLinkClass = ({ isActive }) => 
    `hover:text-zinc-600 transition-all duration-300 ease-in-out ${isActive ? 'font-medium text-black' : ''}`

  return (
    <nav className='w-full h-16 md:h-20 bg-white shadow fixed top-0 left-0 right-0 z-50 text-gray-800 flex items-center justify-between px-4 md:px-8 lg:px-16 font-sans transition-all duration-300 ease-in-out'>
        <div className='w-36 sm:w-44 md:w-48 lg:w-64 xl:w-72 2xl:w-80 flex items-center justify-center transition-all duration-300 ease-in-out'>
            <img 
                src={navLogo}
                alt="logo" 
                className="w-36 h-auto sm:w-44 md:w-48 md:h-auto lg:w-64 xl:w-72 2xl:w-80 object-contain transition-all duration-300 ease-in-out"
            />
        </div>
        <div className='hidden md:flex nav-links items-center justify-center gap-10 text-[0.95rem]'>
           <NavLink to="/" className={navLinkClass}>Home</NavLink>
           <NavLink to="/about" className={navLinkClass}>About</NavLink>
           <NavLink to="/products" className={navLinkClass}>Products</NavLink>
           <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </div>
        <div className='flex items-center justify-center gap-4 sm:gap-10 md:gap-10'>
          <a href="https://wa.me/919137771098" rel="noopener noreferrer" target='_blank' className="transition-transform duration-300 ease-in-out hover:scale-110">
            <i className="ri-whatsapp-fill text-2xl sm:text-3xl text-[#25D366]"></i>
          </a>
          <NavLink to="/cart" className="transition-transform duration-300 ease-in-out hover:scale-110 relative">
            <i className="ri-shopping-cart-fill text-xl sm:text-[1.6rem]"></i>
            {cartItems.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>}
          </NavLink>
          <NavLink to="/login" className="transition-transform duration-300 ease-in-out hover:scale-110">
            <i className="ri-user-3-fill text-xl sm:text-[1.6rem]"></i>
          </NavLink>
        </div>
        <button 
          className="md:hidden text-2xl transition-transform duration-300 ease-in-out hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <i className="ri-close-line text-[1.2rem]" aria-label="Close menu"></i>
          ) : (
            <i className="ri-menu-line text-[1.2rem]" aria-label="Open menu"></i>
          )}
        </button>
        <div className={`absolute top-full left-0 right-0 bg-white shadow rounded-b-xl py-4 px-4 md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <NavLink to="/" className={navLinkClass + " block py-2"}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass + " block py-2"}>About</NavLink>
          <NavLink to="/products" className={navLinkClass + " block py-2"}>Products</NavLink>
          <NavLink to="/contact" className={navLinkClass + " block py-2"}>Contact</NavLink>
          <div className='flex items-center justify-start gap-8 mt-4'>
            <a href="https://www.instagram.com/kolhapuri_kitchen/?hl=en" rel="noopener noreferrer" target='_blank' className="transition-transform duration-300 ease-in-out hover:scale-110">
              <i className="ri-instagram-fill text-3xl text-[#E1306C]"></i>
            </a>
            <a href="https://www.facebook.com/kolhapurikitchen/?view_public_for=102266968077182&ref=page_internal" rel="noopener noreferrer" target='_blank' className="transition-transform duration-300 ease-in-out hover:scale-110">
              <i className="ri-facebook-fill text-3xl text-[#1877F2]"></i>
            </a>
            <a href="https://www.youtube.com/@KolhapuriKitchen/videos" rel="noopener noreferrer" target='_blank' className="transition-transform duration-300 ease-in-out hover:scale-110">
              <i className="ri-youtube-fill text-3xl text-[#FF0000]"></i>
            </a>
            <a href="https://x.com/KolhapuriK" rel="noopener noreferrer" target='_blank' className="transition-transform duration-300 ease-in-out hover:scale-110">
              <i className="ri-twitter-x-fill text-3xl text-black"></i>
            </a>
          </div>
        </div>
    </nav>
  )
}

export default Navbar