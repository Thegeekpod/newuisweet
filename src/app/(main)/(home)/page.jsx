

import { lazy } from 'react';


const Contact = lazy(() => import("@/component/main/pages/home/Contact"))
const Project = lazy(() => import("@/component/main/pages/home/Project"));
const Services = lazy(() => import("@/component/main/pages/home/Services"));
const OurSpecilization = lazy(() => import("@/component/main/pages/home/OurSpecilization"));
const TodayOffer = lazy(() => import("@/component/main/pages/home/TodayOffer"));
const ImportantNotice = lazy(() => import("@/component/main/pages/home/ImportantNotice"));
const OurProduct = lazy(() => import("@/component/main/pages/home/OurProduct"));






export default function Home() {

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
<OurSpecilization/>
<TodayOffer/>





      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        <OurProduct/>
        <ImportantNotice/>
      </div>
  
      <Services />
      <Contact />
    </>

  );
}
