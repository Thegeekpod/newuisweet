import React from 'react'
import ThemeToggle from './ThemeToggleButton'
import Navigationmenu from './Navigationmenu'
import Link from 'next/link'
export default function MobileHeader({toggler,panelRef})
{
  return(
  
    <div ref={panelRef}
    id="mobile-menu"
    className=
    {toggler
    ?  "hs-overlay fixed bottom-0 start-0 top-0 z-[60] h-full w-4/5 transform overflow-y-auto bg-white transition-transform duration-300 translate-x-0 dark:bg-black [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2"
    : "hs-overlay fixed bottom-0 start-0 top-0 z-[60] h-full w-4/5 transform overflow-y-auto bg-white transition-transform duration-300 -translate-x-full dark:bg-black [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2"}
  


  >
    <div className="flex h-full flex-col justify-between gap-5 p-5">
      <div className="">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-3 text-2xl font-semibold text-dark dark:text-white"
        >
         <img src='/logo.png' alt='sweet-developers' className='w-10/12 '/>
        </Link>
      </div>
     <Navigationmenu type={"mobile"}/>
      <div className="flex flex-col gap-3">
       <ThemeToggle type={"mobile"}/>
        <a
          href="contact.html"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-dark px-6 py-4 text-center text-base font-semibold leading-tight text-white transition hover:bg-primary dark:bg-dark-2 dark:text-white dark:hover:bg-primary dark:hover:text-white"
        >
          <span>Let{"'"}s Talk</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            <path d="M17.5 11.667v-5h-5" />
            <path d="m17.5 6.667-7.5 7.5-7.5-7.5" />
          </svg>
        </a>
      </div>
    </div>
  </div>
  )
}