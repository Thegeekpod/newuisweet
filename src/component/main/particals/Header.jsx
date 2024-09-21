"use client"
import React, { useEffect, useRef, useState } from 'react'
import ThemeToggle from './ThemeToggleButton'
import MobileHeader from './MobileHeader';
import Navigationmenu from './Navigationmenu';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useTheme } from '@/app/(main)/hooks/ThemeContext';


export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const [toggle, setToggle] = useState(false);
  const panelRef = useRef(null);
  const router =useSelectedLayoutSegment();
  const buttonRef = useRef(null); // Added ref for the button

  // Function to handle the toggle button click
  const handleToggle = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up
    setToggle(prev => !prev); // Toggle the state
  };

  // Function to handle clicks outside the panel
  const handleBodyClick = (e) => {
    if (
      panelRef.current && 
      !panelRef.current.contains(e.target) && 
      buttonRef.current && 
      !buttonRef.current.contains(e.target)
    ) {
      setToggle(false); // Close the panel if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the panel
    document.addEventListener('mousedown', handleBodyClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleBodyClick);
    };
  }, []);





  useEffect(() => {
    setToggle(false);
}, [router]);

  return (
    <>
      <header className="sticky top-0 z-50">
      <div className="">
        <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow dark:bg-black dark:shadow-dark">
          {/* Logo */}
          <a
  href="index.html"
  className="inline-flex items-center gap-3 px-3 text-2xl font-semibold text-dark dark:text-white"
>
  {theme === 'dark' ? (
    <img
    src="/whitefavicon.png"
    alt="Sweet Developers"
    className="h-6 w-6"
  />
  ):(<img
    src="/favicon.png"
    alt="Sweet Developers"
    className="h-6 w-6"
  />)}
  
  <span>
    {" "}
    Sweet<span className="text-primary"> Developers</span>{" "}
  </span>
</a>

          {/* Navigation menu */}
       <Navigationmenu/>
          {/* Header buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            {/* Theme appearance toggler */}
          <ThemeToggle/>
            <a
              href="contact.html"
              className="inline-flex items-center gap-2 rounded-lg bg-dark px-6 py-4 text-center text-base font-semibold leading-tight text-white transition hover:bg-primary dark:bg-dark-2 dark:text-white dark:hover:bg-primary dark:hover:text-white"
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
          {/* Navigation toggler */}
          <button onClick={handleToggle}
          ref={buttonRef}
            type="button"
            className="text-dark transition dark:text-white/70 lg:hidden"
            
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="h-9 w-9 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

<MobileHeader toggler={toggle} panelRef={panelRef}/>
    </>
  )
}