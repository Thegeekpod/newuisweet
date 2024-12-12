import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import prisma from '../../../../../lib/prisma';
import SocialShare from '@/component/main/common/SocialShare';

// Metadata for SEO optimization
export async function generateMetadata({ params }) {
  // Disable caching for this page
  noStore();

  const slug = params.slug;

  // Fetch the blog post from the database using Prisma
  const data = await prisma.blogs.findUnique({
    where: { slug: slug },
  });

  // Default metadata if no blog is found
  if (!data) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog could not be found.',
      alternates: {
        canonical: `${process.env.BASE_URL}/404`,
      },
      openGraph: {
        type: 'article',
        title: 'Blog Not Found',
        description: 'The requested blog could not be found.',
        url: `${process.env.BASE_URL}/404`,
        images: [
          {
            url: `${process.env.BASE_URL}/logo.png`,
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

  // Metadata for the found blog
  return {
    title: data.seoTitle || data.title,
    description: data.seoDescription || data.description,
    keywords: data.seoKeywords || 'default, keywords, here',
    alternates: {
      canonical: `${process.env.BASE_URL}/articles/${data.slug}`,
    },
    openGraph: {
      type: 'article',
      title: data.seoTitle || data.title,
      description: data.seoDescription || data.description,
      url: `${process.env.BASE_URL}/articles/${data.slug}`,
      images: [
        {
          url: data.image ? `${process.env.BASE_URL}${data.image}` : `${process.env.BASE_URL}/logo.png`,
          width: 1200,
          height: 628,
          alt: data.seoTitle || data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.seoTitle || data.title,
      description: data.seoDescription || data.description,
      image: data.image ? `${process.env.BASE_URL}${data.image}` : `${process.env.BASE_URL}/logo.png`,
    },
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${process.env.BASE_URL}/articles/${data.slug}`,
      },
      headline: data.seoTitle || data.title,
      image: {
        "@type": "ImageObject",
        url: data.image ? `${process.env.BASE_URL}${data.image}` : `${process.env.BASE_URL}/logo.png`,
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
          url: `${process.env.BASE_URL}/logo.png`,
          width: 600,
          height: 60,
        },
      },
      description: data.seoDescription || data.description,
      keywords: data.seoKeywords || 'default, keywords, here',
    }),
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

  // Schema.org structured data
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.BASE_URL}/articles/${data.slug}`,
    },
    headline: data.seoTitle || data.title,
    image: {
      "@type": "ImageObject",
      url: data.image ? `${process.env.BASE_URL}${data.image}` : `${process.env.BASE_URL}/logo.png`,
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
        url: `${process.env.BASE_URL}/logo.png`,
        width: 600,
        height: 60,
      },
    },
    description: data.seoDescription || data.description,
    keywords: data.seoKeywords || 'default, keywords, here',
  };

  const jsonSchema = JSON.stringify(schema);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: (data?.schema || jsonSchema)}} />
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
        <article className="prose mt-6 dark:prose-invert prose-headings:font-medium prose-blockquote:border-primary lg:mt-10">
        <h1 className='text-2xl font-medium text-dark dark:text-light lg:text-2xl'>{data?.title}</h1>
          <div className='prose-content max-w-full'
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
          <SocialShare url={`${process.env.BASE_URL}/articles/${params.slug}`} />
        </div>

        <div className="mt-10 lg:mt-14">
          <h3 className="text-2xl font-semibold leading-tight text-dark dark:text-light lg:text-3xl lg:leading-tight">
            Related Posts
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-8">
            {relatedPosts.map((post) => (
              <div className="" key={post.id}>
                <div className="relative">
                  <Link href={`/articles/${post?.slug}`} className="group block aspect-6/4 overflow-hidden rounded-lg">
                    <img src={post.image} alt={post.title} className="h-full w-full rounded-lg object-cover transition duration-300 group-hover:scale-105" />
                  </Link>
                  <Link href={`/articles/${post?.slug}`} className="block mt-4 text-lg font-semibold leading-snug text-dark transition hover:text-primary dark:text-light lg:text-xl lg:leading-snug">
                    {post?.title}
                  </Link>
                  <p className="mt-2 max-w-md truncate text-muted">{post?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
