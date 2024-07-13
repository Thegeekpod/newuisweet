"use client"
import React, { useState } from 'react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null)
    } else {
      setOpenIndex(index)
    }
  }

  return (
    <div className="mt-10 lg:mt-14">
      <h3 className="text-2xl font-medium text-dark dark:text-light lg:text-3xl">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4 mt-8">
        {questions.map((question, index) => (
          <div
            key={index}
            
            className={`hs-accordion rounded-lg border border-transparent bg-light transition hs-accordion-active:border-light hs-accordion-active:bg-white dark:border-transparent dark:bg-dark-2 dark:hs-accordion-active:border-dark-2 dark:hs-accordion-active:bg-black  ${
              openIndex === index
                ? 'active'
                : ''
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="inline-flex w-full items-center justify-between gap-x-3 px-6 py-5 text-start text-lg font-medium text-dark transition hover:text-muted dark:text-light/70 dark:hover:text-light focus:outline-none xl:text-2xl"
            >
              <span>{question.question}</span>
              <span
                className={`grid h-8 w-8 shrink-0 place-content-center rounded ${
                  openIndex === index ? 'bg-light dark:bg-dark-2' : 'bg-white dark:bg-black'
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
                <p className="text-base xl:text-lg">{question.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const questions = [
  {
    question: 'What does a product designer need to know?',
    answer:
      "I'm here to help if you're searching for a product designer to bring your idea to life or a design partner to help take your business to the next level.",
  },
  {
    question: 'What does a product designer need to know?',
    answer:
      "I'm here to help if you're searching for a product designer to bring your idea to life or a design partner to help take your business to the next level.",
  },
  {
    question: 'What does a product designer need to know?',
    answer:
      "I'm here to help if you're searching for a product designer to bring your idea to life or a design partner to help take your business to the next level.",
  },
  // Add more questions and answers as needed
]

export default FAQ
