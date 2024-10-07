import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



export const GetServices = ({ data }) => {
  return (
    <>
      {/* Service cards */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {data?.length > 0 ? (
          // Show services when data is available
          data.map((service, index) => (
            <div key={service.id || index}>
              <Link href={`/services/${service.slug}`}>
                <div className="rounded-2xl bg-light p-2 text-center dark:bg-dark-2 md:p-4">
                  <div className="grid place-content-center rounded-lg bg-white p-6 dark:bg-black">
                    <div className="relative h-14 w-14 text-primary lg:h-20 lg:w-20 overflow-hidden rounded-md">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-base font-medium text-dark dark:text-light/70">
                    {service.title}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          // Show a message if no data is available
          <div className="col-span-2 md:col-span-4 text-center text-lg font-medium text-muted dark:text-light/70">
            No services found.
          </div>
        )}
      </div>
    </>
  );
};
