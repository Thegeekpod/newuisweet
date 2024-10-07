import { unstable_noStore as noStore } from 'next/cache';
import prisma from '../../../../../lib/prisma';
import FAQ from '@/component/main/common/FAQ';

export async function generateMetadata({ params }) {
  // Disable caching for this page
  noStore();

  const slug = params.slug;

  // Fetch the specialized post from the database using Prisma
  const data = await prisma.specialized.findUnique({
    where: { slug: slug },
  });

  // Default metadata in case of no data found
  const defaultMetadata = {
    title: 'Specialized Not Found',
    description: 'The requested specialized service could not be found.',
    alternates: {
      canonical: `${process.env.BASE_URL}/404`,
    },
    openGraph: {
      type: 'article',
      title: 'Specialized Not Found',
      description: 'The requested specialized service could not be found.',
      url: `${process.env.BASE_URL}/404`,
      images: [
        {
          url: `${process.env.BASE_URL}/logo.png`, // Default image for 404
          width: 800,
          height: 600,
          alt: 'Specialized Not Found',
        },
      ],
    },
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: 'Specialized Not Found',
      description: 'The requested specialized service could not be found.',
    }),
  };

  // If no data is found, return default metadata
  if (!data) return defaultMetadata;

  // Define schema.org structured data
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.BASE_URL}/specialized/${data.slug}`,
    },
    headline: data.seoTitle || data.title,
    image: {
      "@type": "ImageObject",
      "url": data.bannerImage ? `${process.env.BASE_URL}${data.bannerImage}` : `${process.env.BASE_URL}/logo.png`,
      "caption": data.bannerImageCaption || '',
      "width": 1200,
      "height": 628,
    },
    datePublished: data.createdAt.toISOString(),
    dateModified: data.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: 'Sweet Developers',
    },
    publisher: {
      "@type": "Organization",
      name: 'Sweet Developers',
      logo: {
        "@type": "ImageObject",
        "url": `${process.env.BASE_URL}/logo.png`,
        "width": 600,
        "height": 60,
      },
    },
    description: data.seoDescription || data.description,
    keywords: data.seoKeywords || '',
  };

  // Return metadata including all SEO fields
  return {
    title: data.seoTitle || data.title,
    description: data.seoDescription || data.description,
    alternates: {
      canonical: `${process.env.BASE_URL}/specialized/${data.slug}`,
    },
    openGraph: {
      type: 'article',
      title: data.seoTitle || data.title,
      description: data.seoDescription || data.description,
      url: `${process.env.BASE_URL}/specialized/${data.slug}`,
      images: [
        {
          url: data.bannerImage ? `${process.env.BASE_URL}${data.bannerImage}` : `${process.env.BASE_URL}/logo.png`,
          width: 1200,
          height: 628,
          alt: data.seoTitle || data.title,
        },
      ],
    },
    structuredData: JSON.stringify(schema),
  };
}

export default async function Page({ params }) {
  noStore();
  const slug = params.slug;
  const data = await prisma.specialized.findUnique({
    where: { slug: slug },
    include: {
      faqs: true,
    }
  });

  if (!data) {
    return <p>No specialized data available.</p>;
  }

  // Define schema.org structured data for the body
  const schema = {
    "@context": "https://schema.org",
    "@type": "Specialized",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.BASE_URL || 'http://localhost:3000'}/specialized/${data.slug}`,
    },
    headline: data.seoTitle || data.title,
    image: {
      "@type": "ImageObject",
      url: data.bannerImage ? `${process.env.BASE_URL || 'http://localhost:3000'}${data.bannerImage}` : `${process.env.BASE_URL || 'http://localhost:3000'}/logo.png`,
      caption: data.title || '',
      width: 1200,
      height: 628,
    },
    datePublished: data.createdAt.toISOString(),
    dateModified: data.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: 'Sweet Developers',
    },
    publisher: {
      "@type": "Organization",
      name: 'Sweet Developers',
      logo: {
        "@type": "ImageObject",
        url: `${process.env.BASE_URL || 'http://localhost:3000'}/logo.png`,
        width: 600,
        height: 60,
      },
    },
    description: data.seoDescription || data.description,
    keywords: data.seoKeywords || '',
  };
  const jsonSchema = JSON.stringify(schema);
  return (
    <> <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: (data?.schema || jsonSchema) }}
  />
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
      <figure className="aspect-video overflow-hidden rounded-lg">
        <img
          src={data?.bannerImage}
          alt={data?.title || "Blog Image"}
          className="h-full w-full object-cover"
        />
      </figure>

      <article className="prose mt-6 dark:prose-invert xl:prose-lg prose-headings:font-medium prose-blockquote:border-primary lg:mt-10">
        <h2>{data?.title}</h2>
        <div className='prose-content max-w-full'
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
      </article>

      {data?.faqs.length > 0 && (
        <>
          <hr />
          <h3 className="text-2xl font-semibold dark:text-light mt-10 lg:mt-10">
      Frequently Asked Questions
    </h3>
     
          <FAQ data={data?.faqs} />
          <hr className='mt-10' />
        </>
      )}

      {/* Add structured data for SEO */}
     
    </div>
    </>
  );
}
