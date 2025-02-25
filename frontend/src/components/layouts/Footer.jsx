import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#111418] text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-36">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-6 w-6 text-white">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">Bookland</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for books. Discover millions of eBooks, audiobooks, and more at your fingertips.
            </p>
            <div className="flex space-x-4">
              <a href="/" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f0f2f5] text-[#111418] hover:bg-gray-200 transition-colors">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="/" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f0f2f5] text-[#111418] hover:bg-gray-200 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="/" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f0f2f5] text-[#111418] hover:bg-gray-200 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="/" className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f0f2f5] text-[#111418] hover:bg-gray-200 transition-colors">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <FaArrowRight className="h-3 w-3 mr-2" />
                  <span>Bestsellers</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <FaArrowRight className="h-3 w-3 mr-2" />
                  <span>New Releases</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <FaArrowRight className="h-3 w-3 mr-2" />
                  <span>Browse Genres</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <FaArrowRight className="h-3 w-3 mr-2" />
                  <span>Today's Deals</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f0f2f5] text-[#111418]">
                  <FaPhone className="h-4 w-4" />
                </div>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f0f2f5] text-[#111418]">
                  <FaEnvelope className="h-4 w-4" />
                </div>
                <span>support@bookland.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#f0f2f5] text-[#111418]">
                  <FaMapMarkerAlt className="h-4 w-4" />
                </div>
                <span>123 Book Street, Reading City, RC 12345</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Stay updated with our latest releases and special offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-[#f0f2f5] text-[#111418] border-none focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <button
                type="submit"
                className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-[#111418] text-white border border-[#f0f2f5] text-sm font-bold hover:bg-[#f0f2f5] hover:text-[#111418] transition-colors"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Bookland. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link to="/" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/" className="hover:text-white transition-colors">
                Shipping Policy
              </Link>
              <Link to="/" className="hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;