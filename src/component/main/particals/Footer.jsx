import Image from "next/image";
import React from "react";

export default function Footer(){
  const currentYear = new Date().getFullYear();
  return (
    <>
 <footer className="text-center">
  <div className="flex flex-row items-center justify-between gap-4 text-sm text-muted dark:text-light/70">
  <div>
  <p className="text-sm dark:text-light/70">
    © {currentYear} All rights reserved by ♥{" "}
    <a
      href="#"
      className="inline-block border-b border-b-transparent text-primary transition hover:border-b-primary hover:text-blue-600"
    >
      Sweet Developers
    </a>
  </p>
  </div>
  <div className=" flex flex-row gap-4">
    <a
      href="/privacy-policy"
      className="text-primary transition hover:text-blue-600"
    >
      Privacy Policy
    </a>
    <a
      href="/terms-and-conditions"
      className="text-primary transition hover:text-blue-600"
    >
      Terms & Conditions
    </a>
    <a
      href="/refund-policy"
      className="text-primary transition hover:text-blue-600"
    >
      Refund Policy
    </a>
    <a
      href="/sitemap"
      className="text-primary transition hover:text-blue-600"
    >
      Sitemap
    </a>
  </div>
  </div>
</footer>

    <div className="shapes ">
     <div className="fixed -left-1/2 -top-1/2 -z-10 animate-spin-very-slow xl:-left-[20%] xl:-top-1/3">
       <img src="/assets/image/bg/gradient-1.webp" alt="" className="" />
     </div>
     <div className="fixed -right-[50%] top-[10%] -z-10 animate-spin-very-slow xl:-right-[15%] xl:top-[10%]">
       <img src="/assets/image/bg/gradient-2.webp" alt="" className="" />
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