import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import banner1 from "../../../public/banner1.webp"
import banner2 from "../../../public/banner2.webp"
import banner3 from "../../../public/banner3.webp"

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        }
      }
    ]
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-8  "> 
      <Slider {...settings}>
        <div className="aspect-w-16 aspect-h-9 sm:aspect-w-2 sm:aspect-h-1 md:aspect-w-16 md:aspect-h-7 lg:aspect-w-16 lg:aspect-h-6">
          <img src={banner1} alt="Banner 1" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="aspect-w-16 aspect-h-9 sm:aspect-w-2 sm:aspect-h-1 md:aspect-w-16 md:aspect-h-7 lg:aspect-w-16 lg:aspect-h-6">

          <img src={banner2} alt="Banner 2" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="aspect-w-16 aspect-h-9 sm:aspect-w-2 sm:aspect-h-1 md:aspect-w-16 md:aspect-h-7 lg:aspect-w-16 lg:aspect-h-6">

          <img src={banner3} alt="Banner 3" className="w-full h-full object-cover rounded-lg" />
        </div>
      </Slider>

    </div>
  )
}

export default Carousel
