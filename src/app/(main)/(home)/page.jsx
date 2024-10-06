

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
  const randomServices = shuffledServices.slice(0, 8);
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

//seo
const schema = await prisma.sEO.findFirst({
  where: { pagename: 'Home' },
});
  return (
    <>
     <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: (schema?.schema || '')}} />
     

      <Services data={randomServices} isLoading={isLoading} />
       <div className="grid grid-cols-1 gap-4 lg:gap-6">
        <OurSpecilization data={randomSpecialized} />
        <TodayOffer />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        <OurProduct data={projects}/>
        <Articales data ={blog}/>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
      
      <TodayOffer />
        <Career data={job}/>
      </div>
     
    </>

  );
}



export async function generateMetadata() {
  // Disable caching for this page
  noStore();
  
  const data = await prisma.sEO.findFirst({
    where: { pagename: 'Home' },
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
        image:  defaultImage,
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

