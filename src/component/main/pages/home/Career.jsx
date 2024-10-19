import Link from 'next/link';
import React from 'react';
import Stats from './Seats';

const Career = ({ data }) => {
  return (
    <div>
<Stats/>

    <div className="rounded-2xl bg-white px-6 pt-0  shadow dark:bg-black dark:shadow-dark">
      
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="relative z-10 bg-white pb-2 pt-6 text-2xl font-semibold dark:bg-black dark:text-light">
        Join Us
        </h3>
        <Link
          href="/career"
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
      <div className="max-h-[200px] space-y-4 overflow-hidden pb-6 pt-4  [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-0">
        {data.map((job) => (
          <div
            key={job.slug}
            className="animate-scrollY space-y-4 group-hover:[animation-play-state:paused]"
          >
            <div className="flex flex-row gap-1 md:flex-row md:gap-10 justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-content-center rounded-lg bg-light dark:bg-dark-2">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="h-5 w-5"
                  />
                </div>
                <div className="">
                  <h6 className="text-base font-semibold text-dark dark:text-light/70">
                    {job.title.slice(0,10)+ "..."}
                  </h6>
                  <p className="text-sm text-muted">
                    Date : {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link
                href={`/career/apply/${job.slug}`}
                className="inline-flex items-center  rounded-lg border border-transparent bg-primary px-3 py-2 md:px-5 md:py-1 font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50"
              >
                Apply
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <marquee
        behavior="scroll"
        direction="left"
        className=" mb-6 overflow-hidden text-nowrap rounded-lg bg-light p-3 text-lg font-medium text-muted dark:bg-dark-2"
      >
        Available For Hire 🚀 Crafting Digital Experiences 🎨 Available For
        Hiring 🚀 Crafting Digital Experiences 🎨 Let{"'"}s👋 Work Together
      </marquee>
    </div>
     
   </div>
  );
};

export default Career;
