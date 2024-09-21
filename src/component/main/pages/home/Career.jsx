import Link from 'next/link';
import React from 'react';

const Career = ({ data }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark">
      <marquee
        behavior="scroll"
        direction="left"
        className="overflow-hidden text-nowrap rounded-lg bg-light p-3 text-lg font-medium text-muted dark:bg-dark-2"
      >
        Available For Hire 🚀 Crafting Digital Experiences 🎨 Available For
        Hiring 🚀 Crafting Digital Experiences 🎨 Let{"'"}s👋 Work Together
      </marquee>
      <div className="max-h-[200px] space-y-4 overflow-hidden pb-6 pt-4 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-0">
        {data.map((job) => (
          <div
            key={job.slug}
            className="animate-scrollY space-y-4 group-hover:[animation-play-state:paused]"
          >
            <div className="flex flex-col gap-1 md:flex-row md:gap-10 justify-between">
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
                    {job.title}
                  </h6>
                  <p className="text-sm text-muted">
                    Date : {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link
                href={`/apply/${job.slug}`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
  
    </div>
  );
};

export default Career;
