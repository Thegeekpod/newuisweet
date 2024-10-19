import FAQ from '@/component/main/common/FAQ';
import FooterScroller from '@/component/main/pages/services/FooterScroller';
import React, { lazy } from 'react'
import prisma from '../../../../lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';
import GetSpecialized from '@/component/main/common/GetSpecialized';
import { GetServices } from '@/component/main/common/GetServices';
const Services = async () => {
  noStore();
  //services
  var isLoading = true;
  const data = await prisma.services.findMany({
    orderBy: {
      id: 'desc',
    }
  })


  //faqs
  const faq = await prisma.servicesFaq.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  const shuffledFaqs = faq.sort(() => 0.5 - Math.random());
  const randomFaqs = shuffledFaqs.slice(0, 5);
  //specialized
  const specialized = await prisma.specialized.findMany({
    orderBy: {
      id: 'desc',
    },

  });


  //seo
  const schema = await prisma.sEO.findFirst({
    where: { pagename: 'Home' },
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: (schema?.schema || '') }} />

      <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
      <div className="flex flex-col-reverse items-start gap-6 lg:flex-row lg:gap-10">
        <div className="">
          <h2 className="text-2xl font-semibold text-dark dark:text-light">
            Services I <span className="text-primary">Offered</span>
          </h2>
          <p className="mt-4 text-lg text-muted dark:text-light/70">
            Transforming Ideas into Innovative Reality, Elevate Your Vision with
            Our Expert
            <span className="font-semibold text-dark dark:text-white">
              Product Design and Development
            </span>
            Services!
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-light px-4 py-2 text-center text-base font-medium leading-none text-primary dark:bg-dark-2 lg:text-lg">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 dark:bg-light" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span>Available For Hire</span>
        </div>
      </div>
      <div className="mt-10 lg:mt-14">
        <GetSpecialized data={specialized} layout={6} />
        </div>
        <div className="mt-10 lg:mt-14">
          <h3 className="text-2xl font-medium text-dark dark:text-light lg:text-2xl">
            Our Specialized Fields ✨ Worldwide
          </h3>
          <div className='mt-6'>
         <GetServices data={data} />
</div>
        </div>
        
        {randomFaqs.length > 0 &&
      
      ( <><h3 className="text-2xl font-semibold dark:text-light mt-10 lg:mt-10">
       Frequently Asked Questions
     </h3>
       <FAQ data={randomFaqs} />
       </>
       )
       
       }
        <div className="mt-10 lg:mt-14">
        <FooterScroller />
        </div>
      </div>
    </>
  )
}

export default Services

export async function generateMetadata() {
  // Disable caching for this page
  noStore();

  const data = await prisma.sEO.findFirst({
    where: { pagename: 'Services' },
  });

  // Default metadata if no SEO data is found
  const defaultTitle = 'Website Developer Company in India | Sweet Developer';
  const defaultDescription = 'Sweet Developers offers top-tier IT solutions including web development, graphic design, SEO, software development, app development, and UI/UX design.';
  const defaultKeywords = 'web development, graphic design, SEO, software development, app development, UI/UX design, IT solutions, technology, sweet developers';
  const defaultImage = `${process.env.BASE_URL}/logo.png`;

  // Define valid Open Graph types
  const validOgTypes = ['website', 'article', 'video.movie', 'video.episode', 'video.tv_show', 'video.other', 'music.song', 'music.album', 'music.playlist', 'music.radio_station', 'profile'];

  if (!data) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      alternates: {
        canonical: `${process.env.BASE_URL}/404`,
      },
      openGraph: {
        type: 'website',
        title: defaultTitle,
        description: defaultDescription,
        url: `${process.env.BASE_URL}/404`,
        images: [
          {
            url: defaultImage,
            width: 800,
            height: 600,
            alt: 'Blog Not Found',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: defaultTitle,
        description: defaultDescription,
        image: defaultImage,
      },
    };
  }

  // Validate Open Graph type
  const ogType = validOgTypes.includes(data.og_type) ? data.og_type : 'article';

  return {
    title: data.title || defaultTitle,
    description: data.description || defaultDescription,
    alternates: {
      canonical: data.canonical,
    },
    openGraph: {
      type: ogType,
      title: data.og_title || data.title || defaultTitle,
      description: data.og_description || data.description || defaultDescription,
      url: data.og_url,
      images: [
        {
          url: data.og_image ? `${process.env.BASE_URL}${data.og_image}` : defaultImage,
          width: 1200,
          height: 628,
          alt: data.og_title || data.title || defaultTitle,
        },
      ],
      site_name: data.og_site_name || 'Default Site Name',
      locale: data.og_locale || 'en_US',
    },
    twitter: {
      card: data.og_title || 'summary_large_image',
      title: data.og_title || data.title || defaultTitle,
      description: data.og_description || data.description || defaultDescription,
      image: data.og_image ? `${process.env.BASE_URL}${data.og_image}` : defaultImage,
    },
  };
}
