import { lazy } from 'react';


const Contact = lazy(() => import("@/component/main/pages/home/Contact"))
const Project = lazy(() => import("@/component/main/pages/home/project"));
const Services = lazy(() => import("@/component/main/pages/home/Services"));
const Testimonial = lazy(() => import("@/component/main/pages/home/Testimonial"));




export default function Home() {

  return (
    <>
   
      <Testimonial />
      <Project/>
      <Services />
      <Contact />
    </>

  );
}
