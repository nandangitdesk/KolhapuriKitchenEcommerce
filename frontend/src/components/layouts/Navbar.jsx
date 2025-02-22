import React, { useState, useEffect } from 'react'
import { NavLink , Link } from 'react-router-dom'
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
            <div className="flex items-center gap-4">
            <div className="h-6 w-6">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <Link to="/" className="text-lg font-bold tracking-tight text-[#111418]">
              Bookland
            </Link>
          </div>
        <div className='hidden md:flex nav-links items-center justify-center gap-10 text-[0.95rem]'>
           <NavLink to="/" className={navLinkClass}>Home</NavLink>
           <NavLink to="/about" className={navLinkClass}>About</NavLink>
           <NavLink to="/products" className={navLinkClass}>Books</NavLink>
           <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </div>
        <div className='flex items-center justify-center gap-4 sm:gap-10 md:gap-10'>
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
          <NavLink to="/products" className={navLinkClass + " block py-2"}>Books</NavLink>
          <NavLink to="/contact" className={navLinkClass + " block py-2"}>Contact</NavLink>

        </div>
    </nav>
  )
}

export default Navbar