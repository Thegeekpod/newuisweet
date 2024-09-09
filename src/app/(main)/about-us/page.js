import Reviews from '@/component/main/common/Reviews';
import About_Section from '@/component/main/pages/about/About_Section';
import Awards from '@/component/main/pages/services/Awards';
import FooterScroller from '@/component/main/pages/services/FooterScroller';
import Parner from '@/component/main/pages/services/Parner';
import React, { lazy } from 'react'

const page = () => {
  return (
    <>

      <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
        <About_Section />
        <Parner />
        <Reviews />
        <FooterScroller />
      </div>
    </>

  )
}

export default page