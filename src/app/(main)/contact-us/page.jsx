import ContactFormSubmit from '@/component/main/pages/contact/ContactFormSubmit'
import React from 'react'
import prisma from '../../../../lib/prisma'
import { unstable_noStore as noStore } from 'next/cache';
const Contact = async() => {
  //seo
const schema = await prisma.sEO.findFirst({
  where: { pagename: 'Contact' },
});
  return (
    <>
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: (schema?.schema || '')}} />

    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
    <div className="">
      <h2 className="text-2xl font-semibold text-dark dark:text-light">
        Let{"'"}s 👋 <span className="text-primary">Work</span> Together
      </h2>
      <p className="mt-4 text-lg text-muted dark:text-light/70">
      Whether you’re looking for a product designer to bring your ideas to life, a development partner to elevate your business, or expert digital marketing services to boost your brand’s online presence, Sweet Developers is here to help.
      <br /><br />
      We specialize in building seamless and scalable solutions that align with your business goals, ensuring every project delivers real results. Our digital marketing expertise spans SEO, social media marketing, PPC campaigns, email marketing, and content creation to help your business reach the right audience and grow sustainably.
      <br /><br />  
      With a collaborative approach, we ensure your needs are fully understood and implemented, creating products and strategies that drive meaningful impact.
      </p>
      
    </div>
    <div className="mt-10 lg:mt-14">
      <p className='text-muted dark:text-light/70'>Let’s design, develop, and market your ideas to success. Get in touch today and let’s build something amazing!</p>
      <ContactFormSubmit/>
    </div>
    {/* Map */}
    {/* <div className="mt-10 aspect-video overflow-hidden rounded-lg lg:mt-14">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2527998699!2d-74.14448787425354!3d40.697631233397885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1706676940522!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full object-cover"
      />
    </div> */}
    {/* FAQ */}
   
  </div>
  </>
  
  )
}

export default Contact


export async function generateMetadata() {
  // Disable caching for this page
  noStore();
  
  const data = await prisma.sEO.findFirst({
    where: { pagename: 'Contact' },
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
            url:  defaultImage,
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
