import React from 'react'
import { GetServices } from '../../common/GetServices'
import Link from 'next/link'


const Services = ({ data, isLoading }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-2xl font-semibold dark:text-light">
            Services We Offered
          </h3>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 border-b text-center text-base text-primary transition hover:border-b-primary dark:border-b-muted dark:hover:border-b-primary"
          >
            <span>See All Services</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path d="M4.167 10h11.666m-4.999 5 5-5m-5-5 5 5" />
            </svg>
          </Link>
        </div>
        <div className="mt-6">
        <GetServices data={data} isLoading={isLoading}/>
        </div>
      </div>
  )
}

export default Services