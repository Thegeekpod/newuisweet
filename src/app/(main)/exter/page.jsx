import React from 'react'

const page = () => {
  return (
    <>
    <div class="w-full bg-gradient-to-r from-indigo-100 to-violet-100 text-gray-800 rounded-lg p-4 my-4"></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center mt-6 lg:mt-6">
    <div class="order-1 md:order-2 justify-center">
      <h2 class="text-2xl font-medium text-dark dark:text-light lg:text-2xl mt-6 mb-4 block md:hidden">
        SEO For Startups
      </h2>
      <img
        src="https://riseuplabs.com/wp-content/uploads/2021/07/mobile-application-development-guidelines-riseuplabs.jpg"
        alt="AR/VR Mobile App Development"
        class="rounded-full w-52 h-52  md:w-72 md:h-72 shadow-lg"
      />
    </div>
    <div class="order-2 md:order-1 md:text-left">
      <h2 class="text-2xl font-medium text-dark dark:text-light lg:text-2xl mt-6 mb-2 hidden md:block">
        SEO For Startups
      </h2>
      <p class="mt-2 text-muted dark:text-light/70 text-justify">
        As a startup, your online presence is crucial. Our Google SEO optimization services help you gain a competitive edge. We optimize your website and content to rank higher in search results, attract organic traffic, and generate leads. Our data-driven strategies and affordable packages make us the ideal partner for startups looking to establish a strong online foundation and achieve sustainable growth.

      </p>
    </div>
  </div>
  </>
  )
}

export default page