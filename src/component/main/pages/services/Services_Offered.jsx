
import React from 'react'
import { GetServices } from '../../common/GetServices'





const Services_Offered = ({ data, isLoading }) => {
  return (
    <>
      <div className="flex flex-col-reverse items-start gap-6 lg:flex-row lg:gap-10">
        <div className="">
          <h2 className="text-2xl font-semibold text-dark dark:text-light">
            Services I <span className="text-primary">Offered</span>
          </h2>
          <p className="mt-4 text-lg text-muted dark:text-light/70">
            Transforming Ideas into Innovative Reality, Elevate Your Vision with
            Our Expert
            <span className="font-semibold text-dark dark:text-white">
              Product Design and Development
            </span>
            Services!
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-light px-4 py-2 text-center text-base font-medium leading-none text-primary dark:bg-dark-2 lg:text-lg">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 dark:bg-light" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span>Available For Hire</span>
        </div>
      </div>

      <div className="mt-10 lg:mt-14">
      <GetServices data={data} isLoading={isLoading}/>
      </div>
      {/* Image section */}
      {/* <div className="mt-10 aspect-video overflow-hidden rounded-lg bg-light dark:bg-dark-2 lg:mt-14">
        <img
          src="assets/img/blog-img-1.jpg"
          alt=""
          className="h-full w-full rounded-lg object-cover"
        />
      </div> */}
    </>
  )
}

export default Services_Offered
