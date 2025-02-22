import React from 'react'
import { RiLeafLine, RiHeartLine, RiEarthLine, RiSeedlingLine } from 'react-icons/ri';
import MetaData from './layouts/MetaData'
import Navbar from './layouts/Navbar'
import logoImage from '../../public/banner3.webp'
import teamImage from '../assets/images/teamkk.webp'


const values = [
  { icon: <RiLeafLine className="w-6 h-6" />, title: 'Premium Quality', description: 'We source only the finest spices from around the world.' },
  { icon: <RiHeartLine className="w-6 h-6" />, title: 'Passion for Flavor', description: 'We are dedicated to enhancing your culinary experiences.' },
  { icon: <RiEarthLine className="w-6 h-6" />, title: 'Sustainability', description: 'We support sustainable farming practices and fair trade.' },
  { icon: <RiSeedlingLine className="w-6 h-6" />, title: 'Innovation', description: 'We constantly explore new blends and flavors.' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">
        <MetaData title="About" />
        <Navbar />
      {/* Hero Section */}
      <section className="relative bg-black text-white mt-16 sm:mt-20 md:mt-24 lg:mt-28">
        <div className="absolute inset-0">
          <img
            src={logoImage}
            alt="Colorful Spices"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 md:py-20 lg:py-24 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">Spice Up Your World</h1>
          <p className="mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg md:text-xl">
            Discover the rich flavors and aromas of our premium spices, sourced from the finest regions across the globe.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 md:py-20 lg:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-800">Our Spice Journey</h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-700">
          Our story starts in the heart of Kolhapur, a region known for its rich culinary heritage. Inspired by age-old family recipes and a love for authentic flavors, we began our venture with a small, homemade masala business. The love and care that went into crafting each batch soon became the foundation of what would become Kolhapuri Kitchen.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 md:py-20 lg:py-24 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-800">Meet Our Spice Experts</h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-700">
              The passionate individuals who bring the world of spices to your kitchen.
            </p>
          </div>
          <div className="mt-8 sm:mt-12">
            <div className="h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden">
              <img 
                src={teamImage} 
                alt="Our Spice Team" 
                className="w-full h-full object-contain align-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 md:py-20 lg:py-24 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-800">Our Spice Philosophy</h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-700">
              The principles that guide our spice selection and business practices.
            </p>
          </div>
          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-500 rounded-md p-2 sm:p-3 text-white">
                      {value.icon}
                    </div>
                    <div className="ml-4 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-base sm:text-lg font-medium text-red-900 truncate">{value.title}</dt>
                        <dd className="mt-2 text-sm sm:text-base text-zinc-700">{value.description}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black">
        <div className="max-w-2xl mx-auto text-center py-12 px-4 sm:py-16 sm:px-6 md:py-20 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            <span className="block">Ready to spice up your cooking?</span>
            <span className="block mt-2">Explore our exotic spice collection today.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-6 text-zinc-400">
            Discover a world of flavors and aromas to elevate your culinary creations.
          </p>
          <a
            href="/products"
            className="mt-8 w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-zinc-700 bg-white hover:bg-amber-50"
          >
            Shop Spices Now
          </a>
        </div>
      </section>
    </div>
  )
}