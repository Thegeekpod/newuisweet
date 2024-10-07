"use client";
import Slider from "react-slick";
import Image from "next/image";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from "next/link";

export default function OurPartners() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 10000, // Continuous smooth slide
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-3">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5">
          <h3 className="relative z-10 bg-white text-2xl font-semibold dark:bg-black dark:text-light">
            Our Partners
          </h3>
          <Link
            href="#"
            className="inline-flex items-center justify-center gap-2 border-b text-center text-base text-primary transition hover:border-b-primary dark:border-b-muted dark:hover:border-b-primary"
          >
            <span>Become A Partner</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path d="M4.167 10h11.666m-4.999 5 5-5m-5-5 5 5" />
            </svg>
          </Link>
        </div>
        <Slider {...settings}>
          <div className="px-4">
            <div className="mx-automx-4  p-1  border border-gray-300 bg-white rounded-lg rounded-xl overflow-hidden bg-light">
              <Image
                src="/assets/image/client/ana.webp"
                alt="Partner 1"
                width={150}
                height={100}
                className="object-cover"
              />
            </div>
          </div>
          <div className="px-4">
            <div className="mx-automx-4  p-1  border border-gray-300 bg-white rounded-lg rounded-xl overflow-hidden bg-light ">
              <Image
                src="/assets/image/client/delipat.webp"
                alt="Partner 2"
                width={150}
                height={100}
                className="object-cover"
              />
            </div>
          </div>
          <div className="px-4">
            <div className="mx-automx-4  p-1  border border-gray-300 bg-white rounded-lg rounded-xl overflow-hidden bg-light">
              <Image
                src="/assets/image/client/oye.webp"
                alt="Partner 3"
                width={150}
                height={100}
                className="object-cover"
              />
            </div>
          </div>
          <div className="px-4">
            <div className="mx-automx-4  p-1  border border-gray-300 bg-white rounded-lg rounded-xl overflow-hidden bg-light">
              <Image
                src="/assets/image/client/webreads.png"
                alt="Partner 4"
                width={150}
                height={100}
                className="object-cover"
              />
            </div>
          </div>
          <div className="px-4">
            <div className="mx-automx-4  p-1  border border-gray-300 bg-white rounded-lg rounded-xl overflow-hidden bg-light">
              <Image
                src="/assets/image/client/stnadsweb.png"
                alt="Partner 5"
                width={150}
                height={100}
                className="object-cover"
              />
            </div>
          </div>
          <div className="px-4">
            <div className="mx-automx-4 p-1  border border-gray-300 bg-white rounded-lg rounded-xl overflow-hidden bg-light">
              <Image
                src="/assets/image/client/amarkotha.png"
                alt="Partner 6"
                width={150}
                height={100}
                className="object-cover"
              />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
