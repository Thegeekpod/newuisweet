

import { lazy } from 'react';
import prisma from '../../../../lib/prisma';


const Career = lazy(() => import("@/component/main/pages/home/Career"))
const Services = lazy(() => import("@/component/main/pages/home/Services"));
const OurSpecilization = lazy(() => import("@/component/main/pages/home/OurSpecilization"));
const TodayOffer = lazy(() => import("@/component/main/pages/home/TodayOffer"));
const Articales = lazy(() => import("@/component/main/pages/home/Articales"));
const OurProduct = lazy(() => import("@/component/main/pages/home/OurProduct"));
import { unstable_noStore as noStore } from 'next/cache';





export default async function Home() {
  noStore();
  var isLoading = true;

  //services
  const services = await prisma?.services.findMany({
    orderBy: {
      id: 'desc',
    },
  })
  const shuffledServices = services.sort(() => 0.5 - Math.random());
  const randomServices = shuffledServices.slice(0, 4);
  if (randomServices.length > 0) {
    isLoading = false;
  }


  //specialized
  const specialized = await prisma?.specialized.findMany({
    orderBy: {
      id: 'desc',
    },
  })
  const shuffledSpecialized = specialized.sort(() => 0.5 - Math.random());
  const randomSpecialized = shuffledSpecialized.slice(0, 6);

//job
const job = await prisma?.jobPost.findMany({
  orderBy: {
    id: 'desc',
  },
})
//blog
const blog  = await prisma?.blogs.findMany({
  orderBy :{
    id : 'desc'
  }
})
//projects
const projects  = await prisma?.projects.findMany({
  orderBy :{
    id : 'desc'
  }
})
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        <OurSpecilization data={randomSpecialized} />
        <TodayOffer />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        <OurProduct data={projects}/>
        <Articales data ={blog}/>
      </div>

      <Services data={randomServices} isLoading={isLoading} />
      <Career data={job}/>
    </>

  );
}
