"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GetSpecialized = ({ data, layout }) => {
  const [selectedCategory, setSelectedCategory] = useState('All'); // default to 'All'

  // Extract unique categories from the data
  const categories = ['All', ...new Set(data.map(item => item.category))];
  // const categories = [...new Set(data.map(item => item.category))];

  // Filter data based on selected category
  const filteredData = selectedCategory === 'All'
    ? data
    : data.filter(item => item.category === selectedCategory);

  return (
    <>
      {data?.length > 0 && (
        <>
          <div className={layout == "6" ? "grid grid-cols-1  lg:grid-cols-6 lg:gap-1.5 mt-6 mb-4" : "hidden"}>
            {/* Left-aligned items */}
            <div className="col-span-1 grid grid-cols-1 gap-1.5">
              {categories.slice(0, categories.length - 6).map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-[2.5px] py-2 rounded-lg text-center break-words w-full text-base font-medium text-dark ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Right stacked top 3 and under 3 items */}
            <div className="col-span-5 grid grid-cols-2 lg:grid-cols-3 gap-1.5 mt-2 lg:mt-0">
              {/* Top 3 items */}
              {categories.slice(-6, -3).map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-[2.5px] py-2 rounded-lg text-center break-words w-full text-base font-medium text-dark ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                  {category}
                </button>
              ))}

              {/* Spacer */}


              {/* Bottom 3 items */}
              {categories.slice(-3).map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-[2.5px] py-2 rounded-lg text-center break-words w-full text-base font-medium text-dark ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>






          {/* Grid Display */}
          <div className={layout == "6" ? `mt-6 grid grid-cols-2 gap-4 md:grid-cols-6` : `mt-6 grid grid-cols-2 gap-4 md:grid-cols-3`}>
            {filteredData.map((item, index) => (
              <Link key={index} href={`/specialized/${item.slug}`}>
                <div className="text-center">
                  <div className="grid place-content-center rounded-lg bg-light p-3 dark:bg-dark-2">
                    <img width={40} height={40} src={item.image} alt={item.title} className="h-10 w-10 rounded-md" />
                  </div>
                  <p className="mt-1 text-base font-medium text-dark dark:text-light/70">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default GetSpecialized;
