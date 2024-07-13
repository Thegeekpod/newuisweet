"use client"
import React, { useRef } from 'react';

const Reviews = () => {
  const testimonials = [
    {
      id: 1,
      stars: 5,
      quote:
        "We've been using BentoFolio for over a year now, and I must say, it's been a game-changer for us. The user interface is intuitive and the feature.",
      name: 'Oliver Clain',
      role: 'Product Designer',
      link: 'framer.com',
    },
    {
      id: 2,
      stars: 5,
      quote:
        "We've been using BentoFolio for over a year now, and I must say, it's been a game-changer for us. The user interface is intuitive and the feature.",
      name: 'Oliver Clain',
      role: 'Product Designer',
      link: 'framer.com',
    },
    {
      id: 3,
      stars: 5,
      quote:
        "We've been using BentoFolio for over a year now, and I must say, it's been a game-changer for us. The user interface is intuitive and the feature.",
      name: 'Oliver Clain',
      role: 'Product Designer',
      link: 'framer.com',
    },
  ];

  const scrollerRef = useRef(null);

  const scrollLeft = () => {
    scrollerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <div className="mt-10 lg:mt-14">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <h3 className="text-2xl font-medium text-dark dark:text-light lg:text-3xl">
          Trusted By 1200+ Clients
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="grid h-9 w-9 place-content-center rounded-lg border border-muted/30 text-muted transition hover:border-primary hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className="h-5 w-5 shrink-0"
            >
              <path d="M4.167 10h11.666M4.167 10l5 5m-5-5 5-5" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="grid h-9 w-9 place-content-center rounded-lg border border-muted/30 text-muted transition hover:border-primary hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className="h-5 w-5 shrink-0"
            >
              <path d="M4.167 10h11.666m-5 5 5-5m-5-5 5 5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-8 overflow-hidden">
        <div
          ref={scrollerRef}
          className="flex space-x-6 overflow-x-scroll scrollbar-none no-scrollbar"
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={index} className="flex-none w-1/2">
              <div className="flex h-full flex-col justify-between rounded-lg bg-light p-6 dark:bg-dark-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1">
                    {[...Array(testimonial.stars)].map((_, starIndex) => (
                      <img
                        key={starIndex}
                        src="assets/img/star-full.svg"
                        alt=""
                        className="h-4 w-4 shrink-0"
                      />
                    ))}
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded bg-white px-2 py-1 text-sm leading-none text-primary transition hover:bg-primary hover:text-white dark:bg-black"
                  >
                    <span>{testimonial.link}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 14 15"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 shrink-0"
                    >
                      <path d="m9.917 4.583-5.834 5.834m.584-5.834h5.25v5.25" />
                    </svg>
                  </a>
                </div>
                <blockquote className="mt-6 flex-1 text-lg">
                  {testimonial.quote}
                </blockquote>
                <p className="mt-8 font-medium">
                  {testimonial.name} -
                  <span className="font-normal text-muted">
                    {testimonial.role}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
