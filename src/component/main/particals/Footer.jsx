import React from "react";

export default function Footer(){
  return (
    <>
    <footer className="text-center">
      <p className="text-sm dark:text-light/70">
        @ BentoFolio 2023, Design By
        <a
          href="#"
          className="inline-block border-b border-b-transparent text-primary transition hover:border-b-primary hover:text-blue-600"
        >
          MarvelTheme
        </a>
      </p>
    </footer>
    <div className="shapes ">
     <div className="fixed -left-1/2 -top-1/2 -z-10 animate-spin-very-slow xl:-left-[20%] xl:-top-1/3">
       <img src="/assets/img/gradient-1.png" alt="" className="" />
     </div>
     <div className="fixed -right-[50%] top-[10%] -z-10 animate-spin-very-slow xl:-right-[15%] xl:top-[10%]">
       <img src="/assets/img/gradient-2.png" alt="" className="" />
     </div>
     <div className="move-with-cursor fixed left-[10%] top-[20%] -z-10">
       <img src="/assets/img/object-3d-1.png" alt="" className="" />
     </div>
     <div className="move-with-cursor fixed bottom-[20%] right-[10%] -z-10">
       <img src="/assets/img/object-3d-2.png" alt="" className="" />
     </div>
   </div>
   </>
  )
}