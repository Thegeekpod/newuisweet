import Image from 'next/image'
import React from 'react'

const TodayOffer = () => {
  return (
    <div className="group rounded-2xl bg-white px-6 pt-0 shadow dark:bg-black dark:shadow-dark">
    <h3 className="relative z-10 bg-white pb-2 pt-6 text-2xl font-semibold dark:bg-black dark:text-light">
      Today{"'"}s For You
    </h3>
    <div className="max-h-[300px] space-y-4 overflow-hidden pb-6 pt-4 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-0">
      <div className="relative w-full h-[212px] -mt-7"> {/* Set a specific height for the image container */}
        <Image
          src="/assets/image/specialized/today-offer-symbol-dynamic-text-260nw-1490379806.webp"
          alt=""
          layout="responsive"
          width={600}  // original image width
          height={300} // original image height
          className="object-cover w-full h-full rounded" // Use h-full to make the image fill the container
        />
      </div>
    </div>
  </div>
  
  )
}

export default TodayOffer