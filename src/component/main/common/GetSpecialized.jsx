import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const GetSpecialized = ({ data,layout }) => {
  const primaryColor = "#0080e0"; // Adjust this to your preferred primary color

  return (
    <>
      {data?.length > 0 && (
        <div className={`mt-6 grid grid-cols-2 gap-4 md:grid-cols-${layout}`}>
          {data.map((item, index) => (
            <Link key={index} href={`/specialized/${item.slug}`}>
              <div className="text-center">
                <div className="grid place-content-center rounded-lg bg-light p-3 dark:bg-dark-2">
                  <Image width={40} height={40} src={item.image} alt={item.title} className="h-8 w-8" />
                </div>
                <p className="mt-1 text-base font-medium text-dark dark:text-light/70">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default GetSpecialized
