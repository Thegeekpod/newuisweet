import React from 'react'
import FAQ from '../../common/FAQ'

const HomeFaq = () => {
  const data = [
    {
        question: 'Why should I choose SweetDevelopers for my project?',
        answer: 'SweetDevelopers offers expertise in custom solutions, a dedicated team of professionals, competitive pricing, and a proven track record of delivering high-quality services on time. We are committed to helping businesses succeed with innovative and scalable solutions.'
    },
    {
        question: 'What services does SweetDevelopers provide?',
        answer: 'We specialize in: Software development, UI/UX design, SEO and digital marketing, Graphic design, Social media management, and Custom web and mobile app development. Our services are tailored for both B2B and B2C businesses to ensure maximum value and impact.'
    },
    {
        question: 'How does SweetDevelopers support B2B clients?',
        answer: 'We understand the unique needs of B2B clients and offer: Scalable solutions tailored to your industry, Seamless integration with your existing processes, Transparent communication and collaboration, and Long-term support for sustained growth.'
    },
    {
        question: 'How much does it cost to work with SweetDevelopers?',
        answer: 'Our pricing is flexible and designed to meet the needs of B2B and B2C businesses alike. Whether it’s a one-time project or ongoing support, we ensure affordability without compromising on quality. Contact us for a free quote!'
    },
    {
        question: 'How do you ensure quality and timely delivery?',
        answer: 'We follow an agile methodology, maintain regular client communication, and use advanced tools to ensure high-quality outputs and on-time project delivery. Our focus on efficiency ensures that your B2B operations run smoothly.'
    },
    {
        question: 'How do I get started with SweetDevelopers?',
        answer: 'Getting started is easy! Simply contact us via our website, share your requirements, and our team will guide you through the process from consultation to project completion. Whether you are a B2B enterprise or a small business, we create strategies tailored to your goals.'
    }
];

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