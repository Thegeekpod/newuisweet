

import { lazy } from 'react';
import prisma from '../../../../lib/prisma';


const Contact = lazy(() => import("@/component/main/pages/home/Contact"))
const Services = lazy(() => import("@/component/main/pages/home/Services"));
const OurSpecilization = lazy(() => import("@/component/main/pages/home/OurSpecilization"));
const TodayOffer = lazy(() => import("@/component/main/pages/home/TodayOffer"));
const ImportantNotice = lazy(() => import("@/component/main/pages/home/ImportantNotice"));
const OurProduct = lazy(() => import("@/component/main/pages/home/OurProduct"));
import { unstable_noStore as noStore } from 'next/cache';





export default async function Home() {
  noStore();
  var isLoading = true;
  
  const services = await prisma.services.findMany({
      orderBy:{
          id:'desc',
      },
  })
const shuffledServices = services.sort(() => 0.5 - Math.random());
const randomServices = shuffledServices.slice(0, 4);


  if(randomServices.length >0){
      isLoading = false;
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        <OurSpecilization />
        <TodayOffer />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        <OurProduct />
        <ImportantNotice />
      </div>

      <Services data={randomServices} isLoading={isLoading} />
      <Contact />
    </>

  );
}
