"use client"
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const Intro = () => {
  return (
    <div className="">
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:sticky lg:top-24">
      <div className="aspect-7/4 overflow-hidden rounded-lg bg-light text-center dark:bg-dark-2">
      <div>
          <video
             className="object-contain w-full h-auto rounded"
            autoPlay
            loop
            muted
            preload="none"
            
          >
            <source src="/assets/video/homebanner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold dark:text-light">
          Welcome... 👋
        </h3>
        <p className="mt-2 text-muted dark:text-light/70">
        Sweet Developers, established two years ago, offers innovative IT services and products. Our expert team delivers custom software solutions and IT support, dedicated to client success and excellence.
        </p>
        {/* CTA buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href="tel:+918918789119"
            className="inline-flex items-center gap-x-1 lg:gap-x-2 rounded-lg border border-transparent bg-primary lg:px-6 px-2 py-4 font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className="h-6 w-6"
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Zm10 3a2 2 0 0 1 2 2m-2-6a6 6 0 0 1 6 6" />
            </svg>
            <span>Make a call</span>
          </a>
          <a href='https://wa.me/+918918789119' target='_blank' rel='noopener noreferrer' className=" inline-flex items-center gap-x-1 lg:gap-x-2 rounded-lg border bg-lime-50 border-light bg-transparent lg:px-6 px-2 py-4 font-medium text-dark transition [--trigger:focus] hover:text-white hover:bg-lime-500 focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-dark dark:text-light/70 dark:hover:bg-dark dark:hover:text-white">
           
           <FaWhatsapp className="h-6 w-6" />
            <span>WhatsApp Us</span>
          
          </a>
        </div>
        {/* Social */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
  {/* Existing Social Icons */}
  
  

  {/* New Links */}
  {/* <a
    href="/privacy-policy"
    className="text-slate-600 hover:text-primary transition-colors dark:text-slate-500 dark:hover:text-primary"
  >
    Privacy Policy
  </a> |
  <a
    href="/terms-conditions"
    className="text-slate-600 hover:text-primary transition-colors dark:text-slate-500 dark:hover:text-primary"
  >
    Refund Policy
  </a> 
  <a
    href="/refund-policy"
    className="text-slate-600 hover:text-primary transition-colors dark:text-slate-500 dark:hover:text-primary"
  >
    Terms & Conditions
  </a> |
  <a
    href="/refund-policy"
    className="text-slate-600 hover:text-primary transition-colors dark:text-slate-500 dark:hover:text-primary"
  >
    Delivery-process
  </a> */}
</div>
{/* <div className="mt-8 flex flex-wrap items-center gap-2">
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10Z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M13.37 2.094A10.003 10.003 0 0 0 8.002 21.17a7.757 7.757 0 0 1 .163-2.293c.185-.839 1.296-5.463 1.296-5.463a3.74 3.74 0 0 1-.324-1.577c0-1.485.857-2.593 1.923-2.593a1.334 1.334 0 0 1 1.342 1.508c0 .9-.578 2.262-.88 3.54a1.544 1.544 0 0 0 1.575 1.923c1.898 0 3.17-2.431 3.17-5.301 0-2.2-1.457-3.848-4.143-3.848a4.746 4.746 0 0 0-4.93 4.794 2.96 2.96 0 0 0 .648 1.97.48.48 0 0 1 .162.554c-.046.184-.162.623-.208.784a.354.354 0 0 1-.51.254c-1.384-.554-2.036-2.077-2.036-3.816 0-2.847 2.384-6.255 7.154-6.255 3.796 0 6.32 2.777 6.32 5.747 0 3.909-2.177 6.848-5.394 6.848a2.862 2.862 0 0 1-2.454-1.246s-.578 2.316-.692 2.754a8.026 8.026 0 0 1-1.019 2.131c.923.28 1.882.42 2.846.416a9.99 9.99 0 0 0 9.996-10.003 10.002 10.002 0 0 0-8.635-9.903l-.002-.001Z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022ZM10 15.5l6-3.5-6-3.5v7Z" />
            </svg>
          </a>
        </div> */}
      </div>
    </div>
  </div>
  )
}

export default Intro