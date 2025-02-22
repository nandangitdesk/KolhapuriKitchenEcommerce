import React from "react";
import testidefaultimg from "../assets/images/testidefaultimg.avif";



const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image: testidefaultimg,
      description:
        "This bookstore is a hidden gem! The collection is vast, and I always find rare titles that I can't get anywhere else. Fast delivery and excellent packaging make it even better!",

    },
    {
      id: 2,
      image: testidefaultimg,
      description:
        "I love shopping for books here! The website is easy to navigate, and the recommendations are spot on. The customer service is also fantastic—very responsive and helpful!",

    },
    {
      id: 3,
      image: testidefaultimg,
      description:
        "The quality of the books is top-notch, even the pre-owned ones look almost new. I recently ordered a limited edition novel, and it arrived in perfect condition. Highly recommend!",

    },
    {
      id: 4,
      image: testidefaultimg,
      description:
        "A paradise for book lovers! Whether it's fiction, self-help, or academic books, they have everything. The discounts and offers are great, and I always end up buying more than I planned!",

    },
    {
      id: 5,
      image: testidefaultimg,
      description:
        "I recently bought a book as a gift, and the bookstore's gift-wrapping service was amazing. The recipient loved it! Will definitely shop again for more books.",


    },
  ];

  return (
    <div className="w-full h-full mt-10 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-6 pb-10  md:justify-between">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="w-[280px] md:w-[19rem] h-[17rem] p-4 bg-gradient-to-b from-zinc-700 to-zinc-950 rounded-xl flex-shrink-0 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center">
                <i className="ri-double-quotes-l text-2xl"></i>
                <i className="ri-double-quotes-l text-[5rem] text-white opacity-80"></i>
              </div>
              <div className="flex items-center justify-between flex-col">
                <div className="h-20 w-20 rounded-full">
                  <img className="h-full w-full object-cover rounded-full" src={testimonial.image} alt="Testimonial" />
                </div>
                <div className="flex items-center justify-between">
                  <i className="ri-star-s-fill text-white"></i>
                  <i className="ri-star-s-fill text-white"></i>
                  <i className="ri-star-s-fill text-white"></i>
                  <i className="ri-star-s-fill text-white"></i>
                  <i className="ri-star-s-fill text-white"></i>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-white opacity-85">
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
