import React from 'react'
import footcard1 from '../../assets/images/footcard1.webp'
import footcard2 from '../../assets/images/footcard2.webp'
import footcard3 from '../../assets/images/footcard3.webp'
import footerlogo from '../../assets/images/footerlogo.webp'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full h-full mt-10'>
        <div className='w-full px-4 sm:px-8 md:px-16 lg:px-28 flex flex-col sm:flex-row items-center justify-between gap-4'>
            <img src={footcard1} alt="Footer Card 1" className='w-full sm:w-1/3 max-w-[18rem] mb-4 sm:mb-0' />
            <img src={footcard2} alt="Footer Card 2" className='w-full sm:w-1/3 max-w-[18rem] mb-4 sm:mb-0' />
            <img src={footcard3} alt="Footer Card 3" className='w-full sm:w-1/3 max-w-[18rem]' />
        </div>
        <div className='w-full h-full mt-10 bg-black p-4 sm:p-8'>
              <div className='flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-8'>
                <div className='flex flex-col sm:flex-row items-start justify-between gap-8 w-full lg:w-auto'>
                    <div className='w-full sm:w-auto'>
                      <h1 className='text-white text-lg font-semibold'>Contact Us</h1>
                      <ul className='list-none text-white font-light flex flex-col gap-4 mt-2 text-sm'>
                       <li><i className="ri-home-fill"></i> Room No.02, Vitthal Niwas chawl, Sai Nath Nagar, Louis Wadi, Thane, Maharashtra 400604</li>
                       <li><i className="ri-mail-fill"></i> ppatil0028@gmail.com</li>
                       <li><i className="ri-map-pin-fill"></i> +91 9137771098</li>
                      </ul>
                    </div>
                    <div className='w-full sm:w-auto mt-4 sm:mt-0'>
                      <h1 className='text-white text-lg font-semibold'>Quick Links</h1>
                      <ul className='list-none text-white font-light flex flex-col gap-4 mt-2 text-sm'>
                      <Link to="/"><li> Home</li></Link>
                      <Link to="/about"><li> About</li></Link>
                      <Link to="/contact"><li> Contact</li></Link>
                      <Link to="/faq"><li> Faq</li></Link>
                      </ul>
                    </div>
                    <div className='w-full sm:w-auto mt-4 sm:mt-0'>
                      <h1 className='text-white text-lg font-semibold'>Help</h1>
                      <ul className='list-none text-white font-light flex flex-col gap-4 mt-2 text-sm'>
                        <Link to="/privacy-policy"><li> Privacy Policy</li></Link>
                        <Link to="/terms-and-conditions"><li> Terms & Conditions</li></Link>
                        <Link to="/refund-policy"><li> Refund Policy</li></Link>
                        <Link to="/shipping-policy"><li> Shipping Policy</li></Link>
                      </ul>
                    </div>
                </div>
                <div className='flex flex-col items-center lg:items-end justify-between mt-8 lg:mt-0 w-full lg:w-auto'>
                    <div>
                      <img src={footerlogo} alt="Footer logo" className='max-w-full h-auto' />
                    </div>
                    <div className='flex items-center justify-center lg:mr-12 gap-4 text-white text-4xl mt-4 lg:mt-8'>
                      <i className="ri-facebook-fill"></i>
                      <i className="ri-instagram-fill"></i>
                      <i className="ri-youtube-fill"></i>
                      <i className="ri-twitter-x-fill"></i>
                    </div>
                </div>
              </div>
              <div className='border-t-[1px] border-zinc-300 w-full mt-8'>
                   <h1 className='text-white text-sm font-light text-center mt-6'>Copyright © 2024 Kolhapuri Kitchen Masala | All Rights Reserved</h1>
              </div>
        </div>
    </div>
  )
}

export default Footer