import FAQ from '@/component/main/common/FAQ';
import FooterScroller from '@/component/main/pages/services/FooterScroller';
import Reviews from '@/component/main/common/Reviews';
import Services_Offered from '@/component/main/pages/services/Services_Offered';
import React, { lazy } from 'react'
import prisma from '../../../../lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';
import GetSpecialized from '@/component/main/common/GetSpecialized';
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
        <Services_Offered data={data}  />

        <div className="mt-10 lg:mt-14">
          <h3 className="text-2xl font-medium text-dark dark:text-light lg:text-2xl">
            Our Specialized Fields ✨ Worldwide
          </h3>
          <GetSpecialized data={specialized} layout={6} />

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
