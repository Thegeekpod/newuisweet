"use client"
import CountUp from 'react-countup';

export default function Stats() {
  return (
    <div className="rounded-2xl bg-white p-6 mb-6 shadow-lg dark:bg-black dark:shadow-dark text-center">
      <h2 className="text-2xl font-semibold dark:text-light text-gray-900 dark:text-white mb-4">Ready to Embrace Digital Change?</h2>
  
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <p className="text-2xl font-bold text-blue-500 dark:text-blue-400">
            0<CountUp end={2} duration={3} />+
          </p>
          <p className="text-base font-semibold text-dark dark:text-light/70">Years in Service</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <p className="text-2xl font-bold text-blue-500 dark:text-blue-400">
            <CountUp end={12} duration={2} />+
          </p>
          <p className="text-base font-semibold text-dark dark:text-light/70">Global Clients</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <p className="text-2xl font-bold text-blue-500 dark:text-blue-400">
            <CountUp end={95} duration={2} />+
          </p>
          <p className="text-base font-semibold text-dark dark:text-light/70">Project Completed</p>
        </div>
      </div>
<div className='mt-10 mb-4'>
      <a  href="tel:+918918789119"className="px-6 py-4  text-white font-semibold bg-primary rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
        Talk To Our Experts
      </a>
      </div>
    </div>
  );
}
