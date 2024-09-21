import Image from 'next/image'
import React from 'react'
import GetSpecialized from '../../common/GetSpecialized'

const OurSpecilization = ({data}) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark">
    <h3 className="text-2xl font-semibold dark:text-light">
    Our Specialized Fields
    </h3>
    <GetSpecialized data = {data} layout={3}/>
  </div>
  )
}

export default OurSpecilization