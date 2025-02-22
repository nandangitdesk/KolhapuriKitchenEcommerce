import React from "react";
import testi1img from "../assets/images/testi1img.webp";
import testi2img from "../assets/images/testi2img.webp";
import testi3img from "../assets/images/testi3img.webp";
import testi4img from "../assets/images/testi4img.webp";
import testidefaultimg from "../assets/images/testidefaultimg.avif";



const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image: testi1img,
      description:
        "I absolutely love the Kolhapuri Masala! It adds an authentic and rich flavor to all my dishes. The quality is unmatched and it has become a staple in my kitchen. Highly recommend to all spice lovers!",

    },
    {
      id: 2,
      image: testi2img,
      description:
        "The Garam Masala from Kolhapuri Kitchen is amazing! The blend of spices is perfect and enhances the taste of every meal. I especially love using it in my curries and biryanis. Great product!",

    },
    {
      id: 3,
      image: testi3img,
      description:
        "I recently tried the Kanda Lasun Masala and I am impressed by its purity and freshness. It has a vibrant color and a strong aroma, which makes a huge difference in my cooking. Will definitely be purchasing more!",

    },
    {
      id: 4,
      image: testi4img,
      description:
        "Kolhapuri Kitchen Red Chilli Powder is the best Ive ever used. It has the perfect level of heat and adds a beautiful color to my dishes. The quality is excellent and I can tell its made with the finest ingredients.",

    },
    {
      id: 5,
      image: testidefaultimg,
      description:
        "Kolhapuri Kitchen Modak Flour is exceptional! Its perfectly fine and smooth, making my homemade modaks taste authentic and delicious. A must-have for traditional sweet lovers!",


    },
  ];

  return (
    <div className="w-full h-full mt-10 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-6 pb-10  md:justify-between">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="w-[280px] md:w-[19rem] h-[17rem] p-4 bg-gradient-to-b from-rose-50 to-rose-300 rounded-xl flex-shrink-0 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center">
                <i className="ri-double-quotes-l text-2xl"></i>
                <i className="ri-double-quotes-l text-[5rem] text-white opacity-40"></i>
              </div>
              <div className="flex items-center justify-between flex-col">
                <div className="h-20 w-20 rounded-full">
                  <img className="h-full w-full object-cover rounded-full" src={testimonial.image} alt="Testimonial" />
                </div>
                <div className="flex items-center justify-between">
                  <i className="ri-star-s-fill text-red-500"></i>
                  <i className="ri-star-s-fill text-red-500"></i>
                  <i className="ri-star-s-fill text-red-500"></i>
                  <i className="ri-star-s-fill text-red-500"></i>
                  <i className="ri-star-s-fill text-red-500"></i>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs opacity-85">
                {testimonial.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Testimonial;
