import Image from 'next/image'
import React from 'react'

const Testimonial = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-6">
    {/* Work Experience */}
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
    
    <div className="group rounded-2xl bg-white px-6 pt-0 shadow dark:bg-black dark:shadow-dark">
      <h3 className="relative z-10 bg-white pb-2 pt-6 text-2xl font-semibold dark:bg-black dark:text-light">
        Today{"'"}s For You
      </h3>
      <div className="max-h-[200px] space-y-4 overflow-hidden pb-6 pt-4 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-0">
        <div className="relative w-full h-auto -mt-7"> {/* Add a negative margin to move the image up */}
          <Image
            src="/assets/image/specialized/today-offer-symbol-dynamic-text-260nw-1490379806.webp"
            alt=""
            layout="responsive"
            width={600}  // original image width
            height={300} // original image height
            className="object-contain w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
    {/* Expertise */}
  
  </div>
  )
}

export default Testimonial