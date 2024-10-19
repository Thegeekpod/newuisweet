import Reviews from '@/component/main/common/Reviews';
import About_Section from '@/component/main/pages/about/About_Section';
import FooterScroller from '@/component/main/pages/services/FooterScroller';
import React, { lazy } from 'react'
import prisma from '../../../../lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';
import OurPartners from '@/component/main/pages/home/OurPartners';
const page = async () => {
  //seo
  const schema = await prisma.sEO.findFirst({
    where: { pagename: 'About' },
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: (schema?.schema || '') }} />

      <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
        <About_Section />
        <div className="mt-10 lg:mt-14">
          <p className='text-muted dark:text-light/70'>
            At Sweet Developers, we are a team of dedicated professionals specializing in full-stack development and product design. With 12 years of hands-on experience, we have successfully delivered a wide range of innovative digital solutions to clients across 24+ countries. Our expertise spans web development, mobile applications, UI/UX design, e-commerce platforms, and cloud-based services, ensuring we meet the diverse needs of businesses worldwide.
            <br /><br />
            We believe that technology and creativity go hand in hand. Our approach emphasizes the fusion of these two elements to craft solutions that are not only functional but also aesthetically pleasing and user-centric. Whether you need an intuitive product interface, a robust backend system, or a complete end-to-end digital solution, we ensure that every project is tailored to drive growth, enhance user experiences, and promote business innovation.

          </p>
        </div>
        <div className="mt-10 lg:mt-14">
          <OurPartners />
        </div>
        <div className="mt-10 lg:mt-0 grid grid-cols-1 gap-6 lg:grid-cols-1">
          <div className="group rounded-2xl bg-white px-6 py-4 shadow dark:bg-black dark:shadow-dark ">
            <h2 className="text-2xl font-bold text-center mb-6">Our Mission</h2>
            <p className="text-muted dark:text-light/70">
            Our mission at Sweet Developers is to empower businesses with exceptional IT solutions, helping them thrive in an ever-evolving digital landscape. We aim to unlock the true potential of our clients by leveraging the latest technologies—including AI, machine learning, cloud computing, and IoT—combined with innovative product design principles. Our goal is to ensure businesses not only stay relevant but also achieve long-term growth by transforming their challenges into new opportunities.
            </p>
          </div>


          <div className="group rounded-2xl bg-white px-6 py-4 shadow dark:bg-black dark:shadow-dark ">
            <h2 className="text-2xl font-bold text-center mb-6">Our Vision</h2>
            <p className="text-muted dark:text-light/70">
            We envision Sweet Developers becoming a global leader in IT services, known not just for the solutions we provide, but also for the impact we create. We strive to achieve this by maintaining the highest standards of quality and innovation in every project we undertake. Our focus on customer satisfaction is central to our vision, driving us to build long-term partnerships based on trust and results.
            </p>
          </div>
        </div>
        <div className="mt-10 lg:mt-14">
          <p className='text-muted dark:text-light/70'>
          Our commitment to staying ahead of industry trends allows us to deliver forward-thinking solutions that enable our clients to achieve their goals and make a meaningful impact in their respective markets. Through continuous innovation and a client-centric approach, we aim to be the go-to technology partner for businesses around the world.
          </p>
        </div>
        <div className="mt-10 lg:mt-14">
        <FooterScroller />
        </div>
      </div>
    </>

  )
}

export default page



export async function generateMetadata() {
  // Disable caching for this page
  noStore();

  const data = await prisma.sEO.findFirst({
    where: { pagename: 'About' },
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
          url: data?.og_image ? `${process.env.BASE_URL}${data.og_image}` : defaultImage,
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
      image: data?.og_image ? `${process.env.BASE_URL}${data.og_image}` : defaultImage,
    },
  };
}
