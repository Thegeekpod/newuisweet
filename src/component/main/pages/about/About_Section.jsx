import React from 'react'

const About_Section = () => {
  return (
    <>
      <div className="flex flex-col-reverse items-start gap-6 lg:flex-row lg:gap-10">
          <div className="">
            <h2 className="text-2xl font-semibold text-dark dark:text-light ">
              Hi, This Is <span className="text-primary">Sweet Developers </span> 👋
            </h2>
            <p className="mt-4 text-lg text-muted dark:text-light/70">
              A Passionate{' '}
              <span className="font-semibold text-dark dark:text-white">
                Full Stack Developer
              </span>
              🖥️ &amp;
              <span className="font-semibold text-dark dark:text-white">
                Product Designer
              </span>
             
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-light px-4 py-2 text-center text-base font-medium leading-none text-primary dark:bg-dark-2 lg:text-lg">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 dark:bg-light" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>Available For Hire</span>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-6 lg:mt-12 lg:gap-10">
          <div className="flex flex-wrap items-start gap-6 lg:gap-10">
            <div className="">
              <h2 className="text-3xl font-semibold text-dark dark:text-light lg:text-[40px]">
                <span>02</span>+
              </h2>
              <p className="mt-2 text-muted">Year of Experience</p>
            </div>
            <div className="">
              <h2 className="text-3xl font-semibold text-dark dark:text-light lg:text-[40px]">
                <span>95</span>+
              </h2>
              <p className="mt-2 text-muted">Project Completed</p>
            </div>
            <div className="">
              <h2 className="text-3xl font-semibold text-dark dark:text-light lg:text-[40px]">
                <span>12</span>+
              </h2>
              <p className="mt-2 text-muted">Happy Client</p>
            </div>
          </div>
          <div className="relative -mt-6 hidden h-[100px] w-[100px] p-4 lg:block xl:-mt-10">
            <img
              src="assets/img/circle-text.svg"
              alt=""
              className="absolute inset-0 h-full w-full animate-spin-slow dark:hidden"
            />
            <img
              src="assets/img/circle-text-light.svg"
              alt=""
              className="absolute inset-0 hidden h-full w-full animate-spin-slow dark:block"
            />
            <div className="grid h-full w-full place-content-center rounded-full bg-primary text-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="h-10 w-10"
              >
                <path d="M20 5v30m-5-5 5 5 5-5" />
              </svg>
            </div>
          </div>
        </div>
        </>
  )
}

export default About_Section