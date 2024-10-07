import { unstable_noStore as noStore } from 'next/cache';
import prisma from '../../../../../lib/prisma';
import JobApplyForm from '@/component/main/common/JobApplyForm';

export async function generateMetadata({ params }) {
  // Disable caching for this page
  noStore();

  const baseurl = process.env.BASE_URL || 'http://localhost:3000';
  const slug = params.slug;

  // Fetch the specialized post from the database using Prisma
  const data = await prisma.jobPost.findUnique({
    where: { slug: slug },
  });

  // If no data is found, return default metadata
  if (!data) {
    return {
      title: 'Blog Not Found',
      description: 'The requested specialized could not be found.',
      alternates: {
        canonical: `${baseurl}/404`,
      },
      openGraph: {
        type: 'article',
        title: 'Blog Not Found',
        description: 'The requested specialized could not be found.',
        url: `${baseurl}/404`,
        images: [
          {
            url: `${baseurl}/logo.png`, // Default image for 404
            width: 800,
            height: 600,
            alt: 'Blog Not Found',
          },
        ],
      },
      structuredData: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: 'Blog Not Found',
        description: 'The requested specialized could not be found.',
      }),
    };
  }

  // Define schema.org structured data
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseurl}/articles/${data.slug}`,
    },
    headline: data.seoTitle || data.title,
    image: {
      "@type": "ImageObject",
      "url": data.bannerImage ? `${baseurl}${data.bannerImage}` : `${baseurl}/logo.png`,
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
        "url": `${baseurl}/logo.png`,
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
      canonical: `${baseurl}/articles/${data.slug}`,
    },
    openGraph: {
      type: 'article',
      title: data.seoTitle || data.title,
      description: data.seoDescription || data.description,
      url: `${baseurl}/articles/${data.slug}`,
      images: [
        {
          url: data.bannerImage ? `${baseurl}${data.bannerImage}` : `${baseurl}/logo.png`,
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
  const data = await prisma.jobPost.findUnique({
    where: { slug: slug },

  });

  if (!data) {
    return <p>No specialized data available.</p>;
  }



  return (
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
     
     <JobApplyForm jobId={data?.id}/>
      

     
    </div>
  );
}
