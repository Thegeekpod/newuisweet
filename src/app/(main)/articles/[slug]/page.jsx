import { unstable_noStore as noStore } from 'next/cache';

import Link from 'next/link';
import prisma from '../../../../../lib/prisma';
import SocialShare from '@/component/main/common/SocialShare';

export async function generateMetadata({ params }) {
  // Disable caching for this page
  noStore();

  const baseurl = process.env.BASE_URL || 'http://localhost:3000';
  const slug = params.slug;

  // Fetch the blog post from the database using Prisma
  const data = await prisma.blogs.findUnique({
    where: { slug: slug },
  });

  // If no data is found, return default metadata
  if (!data) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog could not be found.',
      alternates: {
        canonical: `${baseurl}/404`,
      },
      openGraph: {
        type: 'article',
        title: 'Blog Not Found',
        description: 'The requested blog could not be found.',
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
        description: 'The requested blog could not be found.',
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
      url: data.image ? `${baseurl}${data.image}` : `${baseurl}/logo.png`,
      caption: data.imageCaption || '',
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
        url: `${baseurl}/logo.png`,
        width: 600,
        height: 60,
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
          url: data.image ? `${baseurl}${data.image}` : `${baseurl}/logo.png`,
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
  // Disable caching for this page
  noStore();

  const slug = params.slug;
  const data = await prisma.blogs.findUnique({
    where: { slug: slug },
  });

  // If no data is found, return an error message
  if (!data) {
    return <p>No blog data available.</p>;
  }

  // Fetch related posts based on tag or categories
  const relatedPosts = await prisma.blogs.findMany({
    where: {
      slug: {
        not: slug, // Exclude the current blog post
      },
    },
    take: 4, // Limit to 4 related posts
  });

  const formattedDate = new Date(data?.createdAt).toLocaleDateString();

  return (
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
      <figure className="aspect-video overflow-hidden rounded-lg">
        <img
          src={data?.image}
          alt={data?.title || "Blog Image"}
          className="h-full w-full object-cover"
        />
      </figure>
      <ul className="mt-4 flex flex-wrap items-center gap-4 md:gap-6">
        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
          {formattedDate}
        </li>
        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
          1.5k Views
        </li>
      </ul>
      <article className="prose mt-6 dark:prose-invert xl:prose-lg prose-headings:font-medium prose-blockquote:border-primary lg:mt-10">
        <h2>{data?.title}</h2>
        <div  className='prose-content max-w-full'
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
      </article>
      <div className="mt-10 flex flex-wrap justify-between gap-4">
        <div className="flex flex-wrap items-center gap-5">
          <h6 className="text-lg font-medium text-dark dark:text-light">Tag:</h6>
          <div className="flex flex-wrap gap-2">
            {data?.tag?.map((tag, index) => (
              <a
                key={index}
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded border border-light px-2 py-1 text-center text-xs font-medium leading-none transition bg-primary text-white dark:border-dark dark:bg-dark-2 dark:text-light/70 dark:bg-primary dark:text-white"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
        <SocialShare  url={`${process.env.BASE_URL }/articles/${params.slug}`} />
      </div>

      <div className="mt-10 lg:mt-14">
        <h3 className="text-2xl font-semibold leading-tight text-dark dark:text-light lg:text-3xl lg:leading-tight">
          Related Posts
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-8">
          {relatedPosts.map((post) => (
            <div className="" key={post.id}>
            <div className="relative">
              <Link href={`/articles/${post?.slug}`}className="group block aspect-6/4 overflow-hidden rounded-lg">
                <img src={post.image} alt={post.title} className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105" />
              </Link>


              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <Link href={`/articles/${post?.slug}`} className="inline-flex items-center justify-center gap-2 rounded bg-white px-2 py-1 text-center text-xs leading-none text-primary shadow transition hover:bg-primary hover:text-white">
                {post?.tag && Array.isArray(post.tag) && post.tag.length > 0 ? post.tag[0] : 'Sweet Developers'}
                </Link>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-medium xl:text-2xl">
              <Link href={`/articles/${post?.slug}`} className="inline-block text-dark transition hover:text-primary dark:text-light/70 dark:hover:text-primary">
                {post.title}
                </Link>
              </h2>

              <ul className="mt-4 flex flex-wrap items-center gap-2">
                <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                By <span className="text-primary"> Sweet Developers</span>
                </li>
                <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                {new Date(post.createdAt).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
