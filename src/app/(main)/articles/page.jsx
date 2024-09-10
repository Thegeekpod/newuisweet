import GetArticles from '@/component/main/pages/artical/GetArticles'
import React from 'react'
import prisma from '../../../../lib/prisma'
import { unstable_noStore as noStore } from 'next/cache';
const Articles = async() => {
  noStore();
  const data = await prisma.blogs.findMany({
    orderBy: {
      id: 'desc',
    },
  
  })
  return (
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
    <div className="">
      <h2 className="text-3xl font-semibold leading-tight text-dark dark:text-light lg:text-[40px] lg:leading-tight">
        My Recent Articles and Publications
      </h2>
      <p className="mt-4 text-lg text-muted dark:text-light/70">
        I’m here to help if you’re searching for a product designer to bring
        your idea to life or a design partner to help take your business to the
        next level.
      </p>
    </div>
 <GetArticles data={data}/>
 </div>



  )
}

export default Articles