"use client";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => {
  const skeletonStyle = { baseColor: "#000000", highlightColor: "#8cceff" };

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col justify-between gap-4 p-4 lg:gap-6 lg:p-6">
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow dark:bg-black dark:shadow-dark">
          {/* Logo */}
          <a href="#" className="inline-flex items-center gap-3 px-3 text-2xl font-semibold text-dark dark:text-white">
            <Skeleton circle height={24} width={24} {...skeletonStyle} />
            <Skeleton height={24} width={120} {...skeletonStyle} />
          </a>
          {/* Navigation menu */}
          <ul className="hidden flex-1 flex-wrap items-center justify-center lg:flex">
            {[...Array(6)].map((_, index) => (
              <li key={index} className="group/menu-item active">
                <a href="#" className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-center text-base font-medium text-muted transition hover:bg-light hover:text-dark group-[.active]/menu-item:bg-light group-[.active]/menu-item:text-dark dark:hover:bg-dark-2 dark:hover:text-white dark:group-[.active]/menu-item:bg-dark-2 dark:group-[.active]/menu-item:text-white">
                  <Skeleton circle height={24} width={24} {...skeletonStyle} />
                  <Skeleton height={20} width={60} {...skeletonStyle} />
                </a>
              </li>
            ))}
          </ul>
          {/* Header buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            <div>
              <Skeleton circle height={40} width={40} {...skeletonStyle} />
              <Skeleton circle height={40} width={40} {...skeletonStyle} />
            </div>
            <Skeleton height={40} width={120} {...skeletonStyle} />
          </div>
          {/* Navigation toggler */}
          <button type="button" className="text-dark transition dark:text-white/70 lg:hidden" aria-controls="mobile-menu" aria-label="Toggle navigation">
            <span className="sr-only">Toggle Navigation</span>
            <Skeleton height={36} width={36} {...skeletonStyle} />
          </button>
        </div>
      </header>
      {/* Header end */}
      
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Intro */}
        <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark">
          <Skeleton className="aspect-6/4 overflow-hidden rounded-lg" {...skeletonStyle} />
          <div className="mt-6">
            <Skeleton className="text-2xl font-semibold" {...skeletonStyle} />
            <Skeleton className="mt-2 text-muted" {...skeletonStyle} />
            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Skeleton width={180} className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-primary px-6 py-4 font-medium text-white" {...skeletonStyle} />
              <Skeleton width={170} className="inline-flex items-center gap-x-2 rounded-lg border border-light bg-transparent px-6 py-4 font-medium text-dark" {...skeletonStyle} />
            </div>
            {/* Social icons */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} width={50} height={50} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600" {...skeletonStyle} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 lg:gap-6">
          {/* Work Experience */}
          <div className="group rounded-2xl bg-white px-6 pt-0 shadow dark:bg-black dark:shadow-dark">
            <h3 className="relative z-10 bg-white pb-2 pt-6 text-2xl font-semibold dark:bg-black dark:text-light">
              <Skeleton {...skeletonStyle} />
            </h3>
            <div className="max-h-[200px] space-y-4 overflow-hidden pb-6 pt-4 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-0">
              <div className="animate-scrollY space-y-4 group-hover:[animation-play-state:paused]">
                {[...Array(3)].map((_, idx) => (
                  <div className="flex flex-col gap-1 md:flex-row md:gap-10" key={idx}>
                    <Skeleton width={100} height={20} {...skeletonStyle} />
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 shrink-0 place-content-center rounded-lg bg-light dark:bg-dark-2">
                        <Skeleton width={32} height={32} {...skeletonStyle} />
                      </div>
                      <div>
                        <h6 className="text-base font-semibold text-dark dark:text-light/70">
                          <Skeleton width={150} height={20} {...skeletonStyle} />
                        </h6>
                        <p className="text-sm text-muted">
                          <Skeleton width={100} height={16} {...skeletonStyle} />
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark">
            <h3 className="text-2xl font-semibold dark:text-light">
              <Skeleton width={150} height={24} {...skeletonStyle} />
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="text-center" key={index}>
                  <div className="grid place-content-center rounded-lg bg-light p-3 dark:bg-dark-2">
                    <Skeleton width={32} height={32} {...skeletonStyle} />
                  </div>
                  <p className="mt-1 text-base font-medium text-dark dark:text-light/70">
                    <Skeleton width={80} height={20} {...skeletonStyle} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Projects */}
        <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-2xl font-semibold dark:text-light">
              <Skeleton width={150} height={24} {...skeletonStyle} />
            </h3>
            <a href="#" className="inline-flex items-center justify-center gap-2 border-b text-center text-base text-primary transition hover:border-b-primary dark:border-b-muted dark:hover:border-b-primary">
              <span>
                <Skeleton width={100} height={20} {...skeletonStyle} />
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="h-5 w-5">
                <path d="M4.167 10h11.666m-4.999 5 5-5m-5-5 5 5" />
              </svg>
            </a>
          </div>
          <div className="mt-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="group relative rounded-xl border border-light bg-white shadow dark:border-dark-2 dark:bg-dark" key={index}>
                  <Skeleton className="aspect-video rounded-xl" baseColor="#e0e0e0" highlightColor="#8cceff" />
                  <div className="p-4">
                    <Skeleton className="text-lg font-semibold" {...skeletonStyle} />
                    <Skeleton className="mt-1 text-sm text-muted" {...skeletonStyle} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkeletonLoader;
