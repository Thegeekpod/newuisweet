import React from 'react'
import ThemeToggle from './ThemeToggleButton'
import Navigationmenu from './Navigationmenu'
export default function MobileHeader({toggler,panelRef})
{
  return(
  
    <div ref={panelRef}
    id="mobile-menu"
    className=
    {toggler
    ?  "hs-overlay fixed bottom-0 start-0 top-0 z-[60] h-full w-64 transform overflow-y-auto bg-white transition-transform duration-300 translate-x-0 dark:bg-black [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2"
    : "hs-overlay fixed bottom-0 start-0 top-0 z-[60] h-full w-64 transform overflow-y-auto bg-white transition-transform duration-300 -translate-x-full dark:bg-black [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2"}
  


  >
    <div className="flex h-full flex-col justify-between gap-5 p-5">
      <div className="">
        {/* Logo */}
        <a
          href="index.html"
          className="inline-flex items-center gap-3 px-3 text-2xl font-semibold text-dark dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6"
          >
            <path
              fill="currentColor"
              d="M0 1.5A1.5 1.5 0 0 1 1.5 0H9a1.5 1.5 0 0 1 1.5 1.5v21A1.5 1.5 0 0 1 9 24H1.5A1.5 1.5 0 0 1 0 22.5v-21Zm13.5 0A1.5 1.5 0 0 1 15 0h7.5A1.5 1.5 0 0 1 24 1.5V9a1.5 1.5 0 0 1-1.5 1.5H15A1.5 1.5 0 0 1 13.5 9V1.5Zm0 13.5a1.5 1.5 0 0 1 1.5-1.5h7.5A1.5 1.5 0 0 1 24 15v7.5a1.5 1.5 0 0 1-1.5 1.5H15a1.5 1.5 0 0 1-1.5-1.5V15Z"
            />
          </svg>
          <span>
            {" "}
            Bento<span className="text-primary">Folio</span>{" "}
          </span>
        </a>
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