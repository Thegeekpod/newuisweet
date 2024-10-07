"use client";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const ProjectSlider = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="group rounded-2xl bg-white px-6 pt-0 shadow dark:bg-black dark:shadow-dark">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="relative z-10 bg-white pb-2 pt-6 text-2xl font-semibold dark:bg-black dark:text-light">
          Our Projects
        </h3>
        <Link
          href="/projects"
          className="inline-flex items-center justify-center gap-2 border-b text-center text-base text-primary transition hover:border-b-primary dark:border-b-muted dark:hover:border-b-primary"
        >
          <span>See All</span>
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

      <div className="mt-3">
        <Slider {...settings}>
          {data.map((project, index) => (
            <div key={index} className="project-slide">
              <div className="relative group hover-trigger">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover max-h-[200px] rounded-lg opacity-100 transition-opacity duration-300 group-hover:opacity-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h4 className="text-center text-base text-primary transition">
                    {project.title}
                  </h4>
                  
                  <a
                    href={project.url}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 border-b text-center text-base text-primary transition hover:border-b-primary dark:border-b-muted dark:hover:border-b-primary"
                  >
                    <span>Visit</span>
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
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProjectSlider;
