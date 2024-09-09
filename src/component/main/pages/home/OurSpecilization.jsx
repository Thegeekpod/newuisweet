import Image from 'next/image'
import React from 'react'

const OurSpecilization = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark">
    <h3 className="text-2xl font-semibold dark:text-light">
    Our Specialized Fields
    </h3>
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
      <div className="text-center">
        <div className="grid place-content-center rounded-lg bg-light p-3 dark:bg-dark-2">
          <Image width={40} height={40} src="/assets/image/specialized/laravel.webp" alt="" className="h-8 w-8" />
        </div>
        <p className="mt-1 text-base font-medium text-dark dark:text-light/70">
          Laravel
        </p>
      </div>
      <div className="text-center">
        <div className="grid place-content-center rounded-lg bg-light p-3 dark:bg-dark-2">
        <Image width={40} height={40} src="/assets/image/specialized/mern.webp" alt="" className="h-8 w-8" />
        </div>
        <p className="mt-1 text-base font-medium text-dark dark:text-light/70">
          MERN
        </p>
      </div>
      <div className="text-center">
        <div className="grid place-content-center rounded-lg bg-light p-3 dark:bg-dark-2">
        <Image width={40} height={40} src="/assets/image/specialized/wordpress.webp" alt="" className="h-8 w-8" />

        </div>
        <p className="mt-1 text-base font-medium text-dark dark:text-light/70">
          Wordpress
        </p>
      </div>
      <div className="text-center">
        <div className="grid place-content-center rounded-lg bg-light p-3 dark:bg-dark-2">
        <Image width={40} height={40} src="/assets/image/specialized/seo.webp" alt="" className="h-8 w-8" />

        </div>
        <p className="mt-1 text-base font-medium text-dark dark:text-light/70">
          SEO/SMO/PPC
        </p>
      </div>
      <div className="text-center">
        <div className="grid place-content-center rounded-lg bg-light p-3 dark:bg-dark-2">
        <Image width={40} height={40} src="/assets/image/specialized/gads.webp" alt="" className="h-8 w-8" />

        </div>
        <p className="mt-1 text-base font-medium text-dark dark:text-light/70">
          G/FB-Ads
        </p>
      </div>
      <div className="text-center">
        <div className="grid place-content-center rounded-lg bg-light p-3 dark:bg-dark-2">
        <Image width={40} height={40} src="/assets/image/specialized/app.webp" alt="" className="h-8 w-8" />

        </div>
        <p className="mt-1 text-base font-medium text-dark dark:text-light/70">
          App
        </p>
      </div>
    </div>
  </div>
  )
}

export default OurSpecilization