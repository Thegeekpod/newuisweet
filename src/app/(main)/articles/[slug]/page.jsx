import { unstable_noStore as noStore } from 'next/cache';
import prisma from '../../../../../lib/prisma';
import Link from 'next/link';

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
      "url": data.image ? `${baseurl}${data.image}` : `${baseurl}/logo.png`,
      "caption": data.imageCaption || '',
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
  noStore();
  const slug = params.slug;
  const data = await prisma.blogs.findUnique({
    where: { slug: slug },
  });

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
    take: 4, // Limit to 3 related posts
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
        <div
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
      </article>
      <div className="mt-10 flex flex-wrap justify-between gap-4">
        <div className="flex flex-wrap items-center gap-5">
          <h6 className="text-lg font-medium text-dark dark:text-light">tag:</h6>
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
        <div className="flex flex-wrap items-center gap-5">
          <h6 className="text-lg font-medium text-dark dark:text-light">Share:</h6>
          <div className="flex flex-wrap items-center gap-2">
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10Z" />
              </svg>
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M13.37 2.094A10.003 10.003 0 0 0 8.002 21.17a7.757 7.757 0 0 1 .163-2.293c.185-.839 1.296-5.463 1.296-5.463a3.74 3.74 0 0 1-.324-1.577c0-1.485.857-2.593 1.923-2.593a1.334 1.334 0 0 1 1.342 1.508c0 .9-.578 2.262-.88 3.54a1.544 1.544 0 0 0 1.575 1.923c1.898 0 3.17-2.431 3.17-5.301 0-2.2-1.457-3.848-4.143-3.848a4.746 4.746 0 0 0-4.93 4.794 2.96 2.96 0 0 0 .648 1.97.48.48 0 0 1 .162.554c-.046.184-.162.623-.208.784a.354.354 0 0 1-.51.254c-1.384-.554-2.036-2.077-2.036-3.816 0-2.847 2.384-6.255 7.154-6.255 3.796 0 6.32 2.777 6.32 5.747 0 3.909-2.177 6.848-5.394 6.848a2.862 2.862 0 0 1-2.454-1.246s-.578 2.316-.692 2.754a8.026 8.026 0 0 1-1.019 2.131c.923.28 1.882.42 2.846.416a9.99 9.99 0 0 0 9.996-10.003 10.002 10.002 0 0 0-8.635-9.903l-.002-.001Z" />
              </svg>
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-center text-slate-600 transition hover:text-primary focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-dark-2 dark:text-slate-500 dark:hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.482.755.755 0 0 0 .963-.633V14.4h-2.23v-2.09h2.23V10.3c0-2.227 1.354-3.444 3.315-3.444.83 0 1.546.063 1.758.091v2.056l-1.21.001c-1.191 0-1.426.568-1.426 1.41v1.83h2.79l-.363 2.089h-2.428v6.493a.755.755 0 0 0 .963.633A9.994 9.994 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 lg:mt-14">
                    <h3 className="text-2xl font-semibold leading-tight text-dark dark:text-light lg:text-3xl lg:leading-tight">
                        Related Post
                    </h3>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-8">
          {relatedPosts.map((post) => (
            <>
              <div className="">
                <div className="relative">
                  <Link href={post?.slug}className="group block aspect-6/4 overflow-hidden rounded-lg">
                    <img src={post.image} alt={post.title} className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105" />
                  </Link>


                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <Link href={post?.slug} className="inline-flex items-center justify-center gap-2 rounded bg-white px-2 py-1 text-center text-xs leading-none text-primary shadow transition hover:bg-primary hover:text-white">
                    {post?.tag && Array.isArray(post.tag) && post.tag.length > 0 ? post.tag[0] : 'Sweet Developers'}
                    </Link>
                  </div>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-medium xl:text-2xl">
                  <Link href={post?.slug} className="inline-block text-dark transition hover:text-primary dark:text-light/70 dark:hover:text-primary">
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
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
