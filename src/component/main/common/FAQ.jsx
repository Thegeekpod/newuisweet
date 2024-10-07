"use client";
import React, { useState } from 'react';

const FAQ = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div>
     
      {data.length > 0 && (
        
        <div className="">
         
          <div className="space-y-4 mt-8">
            {data.map((question, index) => (
              <div
                key={index}
                className={`hs-accordion rounded-lg border border-transparent bg-light transition hs-accordion-active:border-light hs-accordion-active:bg-white dark:border-transparent dark:bg-dark-2 dark:hs-accordion-active:border-dark-2 dark:hs-accordion-active:bg-black ${
                  openIndex === index ? 'active' : ''
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="inline-flex w-full items-center justify-between gap-x-3 px-6 py-5 text-start text-lg font-medium text-dark transition hover:text-muted dark:text-light/70 dark:hover:text-light focus:outline-none xl:text-xl"
                >
                  <span>{question.question}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-content-center rounded ${
                      openIndex === index
                        ? 'bg-light dark:bg-dark-2'
                        : 'bg-white dark:bg-black'
                    } text-primary`}
                  >
                    {openIndex === index ? (
                      <svg
                        className="block h-3.5 w-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg
                        className="block h-3.5 w-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    )}
                  </span>
                </button>
                <div
                  className={`hs-accordion-content overflow-hidden transition-[height] duration-300 ${
                    openIndex === index ? 'max-h-screen' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5">
                  <div  className='prose-content max-w-full'
          dangerouslySetInnerHTML={{ __html: question.answer }}
        />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;
