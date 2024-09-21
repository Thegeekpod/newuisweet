import Link from 'next/link'
import React from 'react'

const OurProduct = ({data}) => {
  return (
    <div className="group rounded-2xl bg-white px-6 pt-0 shadow dark:bg-black dark:shadow-dark">
        <div className='flex flex-wrap items-center justify-between gap-2'>
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
        <div className="max-h-[200px] space-y-4 overflow-hidden pb-6 pt-4 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-0">
        {data.map((item) => (
          <div
            key={item.slug}
            className="animate-scrollY space-y-4 group-hover:[animation-play-state:paused]"
          >
            <div className="flex flex-col gap-1 md:flex-row md:gap-10 justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-content-center rounded-lg bg-light dark:bg-dark-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-5 w-5"
                  />
                </div>
                <div className="">
                  <h6 className="text-base font-semibold text-dark dark:text-light/70">
                    {item.title}
                  </h6>
                  <p className="text-sm text-muted">
                    Date : {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link
                href={`/articles/${item.slug}`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View
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
  )
}

export default OurProduct