import React from 'react'

const FooterScroller = () => {
  return (
    <div className="mt-10 lg:mt-1">
      <div className="group flex gap-6 overflow-hidden rounded-lg bg-light p-6 dark:bg-dark-2">
        <div className="relative flex min-w-full shrink-0 animate-infinite-scroll gap-6 group-hover:[animation-play-state:paused]">
          <a
            href="contact.html"
            className="relative inline-block whitespace-nowrap text-3xl font-medium text-muted transition before:mr-3 before:content-['\2022'] hover:text-dark dark:text-muted dark:hover:text-white md:text-[40px]"
          >
            Let{"'"}s 👋 Work Together
          </a>
          <a
            href="contact.html"
            className="relative inline-block whitespace-nowrap text-3xl font-medium text-muted transition before:mr-3 before:content-['\2022'] hover:text-dark dark:text-muted dark:hover:text-white md:text-[40px]"
          >
            Let{"'"}s 👋 Work Together
          </a>
        </div>
        <div className="relative flex min-w-full shrink-0 animate-infinite-scroll gap-6 group-hover:[animation-play-state:paused]">
          <a
            href="contact.html"
            className="relative inline-block whitespace-nowrap text-3xl font-medium text-muted transition before:mr-3 before:content-['\2022'] hover:text-dark dark:text-muted dark:hover:text-white md:text-[40px]"
          >
            Let{"'"}s 👋 Work Together
          </a>
          <a
            href="contact.html"
            className="relative inline-block whitespace-nowrap text-3xl font-medium text-muted transition before:mr-3 before:content-['\2022'] hover:text-dark dark:text-muted dark:hover:text-white md:text-[40px]"
          >
            Let{"'"}s 👋 Work Together
          </a>
        </div>
      </div>
    </div>
  )
}

export default FooterScroller