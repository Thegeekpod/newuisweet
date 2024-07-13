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
      <About_Section/>
        <Parner/>
      
        <Reviews/>
       
        <Awards/>
        <div className="mt-10 lg:mt-14">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h3 className="text-2xl font-medium text-dark dark:text-light lg:text-3xl">
              Article and Publications
            </h3>
            <div className="flex items-center gap-2">
              <button className="blog-carousel-button-prev grid h-9 w-9 place-content-center rounded-lg border border-muted/30 text-muted transition hover:border-primary hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M4.167 10h11.666M4.167 10l5 5m-5-5 5-5" />
                </svg>
              </button>
              <button className="blog-carousel-button-next grid h-9 w-9 place-content-center rounded-lg border border-muted/30 text-muted transition hover:border-primary hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M4.167 10h11.666m-5 5 5-5m-5-5 5 5" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-8">
            <div className="swiper blog-carousel">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="">
                    <div className="relative">
                      <a
                        href="article.html"
                        className="group block aspect-6/4 overflow-hidden rounded-lg"
                      >
                        <img
                          src="assets/img/blog-img-1.jpg"
                          alt=""
                          className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105"
                        />
                      </a>
                      {/* Tags */}
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center gap-2 rounded bg-white px-2 py-1 text-center text-xs leading-none text-primary shadow transition hover:bg-primary hover:text-white"
                        >
                          Development
                        </a>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-medium xl:text-2xl">
                        <a
                          href="article.html"
                          className="inline-block text-dark transition hover:text-primary dark:text-light/70 dark:hover:text-primary"
                        >
                          Want To Upgrade Your Brain? Stop Doing These 7 Things
                        </a>
                      </h2>
                      <ul className="mt-4 flex flex-wrap items-center gap-2">
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          15 min read
                        </li>
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          Nov 6, 2023
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="">
                    <div className="relative">
                      <a
                        href="article.html"
                        className="group block aspect-6/4 overflow-hidden rounded-lg"
                      >
                        <img
                          src="assets/img/blog-img-2.jpg"
                          alt=""
                          className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105"
                        />
                      </a>
                      {/* Tags */}
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center gap-2 rounded bg-white px-2 py-1 text-center text-xs leading-none text-primary shadow transition hover:bg-primary hover:text-white"
                        >
                          Development
                        </a>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-medium xl:text-2xl">
                        <a
                          href="article.html"
                          className="inline-block text-dark transition hover:text-primary dark:text-light/70 dark:hover:text-primary"
                        >
                          Want To Upgrade Your Brain? Stop Doing These 7 Things
                        </a>
                      </h2>
                      <ul className="mt-4 flex flex-wrap items-center gap-2">
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          15 min read
                        </li>
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          Nov 6, 2023
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="">
                    <div className="relative">
                      <a
                        href="article.html"
                        className="group block aspect-6/4 overflow-hidden rounded-lg"
                      >
                        <img
                          src="assets/img/blog-img-3.jpg"
                          alt=""
                          className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105"
                        />
                      </a>
                      {/* Tags */}
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center gap-2 rounded bg-white px-2 py-1 text-center text-xs leading-none text-primary shadow transition hover:bg-primary hover:text-white"
                        >
                          Development
                        </a>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-medium xl:text-2xl">
                        <a
                          href="article.html"
                          className="inline-block text-dark transition hover:text-primary dark:text-light/70 dark:hover:text-primary"
                        >
                          Want To Upgrade Your Brain? Stop Doing These 7 Things
                        </a>
                      </h2>
                      <ul className="mt-4 flex flex-wrap items-center gap-2">
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          15 min read
                        </li>
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          Nov 6, 2023
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <FooterScroller/>
      </div>
    </>

  )
}

export default page