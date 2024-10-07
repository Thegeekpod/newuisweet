import React from 'react'
import FAQ from '../../common/FAQ'

const HomeFaq = () => {
    const data = [
        {
            question: 'What is the difference between a website and a web application?',
            answer: 'A website is a collection of web pages that are organized around a single topic or theme. A web application, on the other hand, is a software application that runs on a web browser and provides a user-friendly interface for users to interact with the application.'
        },  {
            question: 'What is the difference between a website and a web application?',
            answer: 'A website is a collection of web pages that are organized around a single topic or theme. A web application, on the other hand, is a software application that runs on a web browser and provides a user-friendly interface for users to interact with the application.'
        },  {
            question: 'What is the difference between a website and a web application?',
            answer: 'A website is a collection of web pages that are organized around a single topic or theme. A web application, on the other hand, is a software application that runs on a web browser and provides a user-friendly interface for users to interact with the application.'
        },  {
            question: 'What is the difference between a website and a web application?',
            answer: 'A website is a collection of web pages that are organized around a single topic or theme. A web application, on the other hand, is a software application that runs on a web browser and provides a user-friendly interface for users to interact with the application.'
        },  {
            question: 'What is the difference between a website and a web application?',
            answer: 'A website is a collection of web pages that are organized around a single topic or theme. A web application, on the other hand, is a software application that runs on a web browser and provides a user-friendly interface for users to interact with the application.'
        },  {
            question: 'What is the difference between a website and a web application?',
            answer: 'A website is a collection of web pages that are organized around a single topic or theme. A web application, on the other hand, is a software application that runs on a web browser and provides a user-friendly interface for users to interact with the application.'
        },
        
        
    ]
  return (
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-2xl font-semibold dark:text-light">
        Frequently Asked Questions
      </h3>
     
    </div>
    <div className="mt-6 ">
    <FAQ data={data}/>
    </div>
    </div>
  )
}

export default HomeFaq