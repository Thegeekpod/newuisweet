
import React from 'react'
import prisma from '../../../../lib/prisma'
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
const PER_PAGE = 12;
const Articles = async ({ searchParams }) => {

  noStore();
  const page = parseInt(searchParams?.page) || 1; // Get current page from query param or default to 1
  const skip = (page - 1) * PER_PAGE;
  const data = await prisma.blogs.findMany({
    orderBy: {
      id: 'desc',
    },
    take: PER_PAGE, // Number of projects per page
    skip: skip
  });
  const totalProjects = await prisma.blogs.count();
  const totalPages = Math.ceil(totalProjects / PER_PAGE);
  //seo
  const schema = await prisma.sEO.findFirst({
    where: { pagename: 'Articles' },
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: (schema?.schema || '') }} />

      <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
        <div className="">
          <h2 className="text-2xl font-semibold text-dark dark:text-light">
            Our Recent Articles and Publications
          </h2>
          <p className="mt-4 text-lg text-muted dark:text-light/70">
            I’m here to help if you’re searching for a product designer to bring
            your idea to life or a design partner to help take your business to the
            next level.
          </p>
        </div>
        <div className="mt-10 lg:mt-14">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
            {data.map((blog) => (
              <div key={blog.id}>
                <div className="relative">
                  <Link
                    href={`/articles/${blog.slug}`} // Adjust the URL as needed
                    className="group block aspect-6/4 overflow-hidden rounded-lg"
                  >
                    <img
                      src={`${blog.image}`} // Assuming `blog.image` contains the filename
                      alt={blog.title}
                      className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105"
                    />
                  </Link>
                  {/* Tags */}

                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    <Link
                      href={`/articles/${blog.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded bg-white px-2 py-1 text-center text-xs leading-none text-primary shadow transition hover:bg-primary hover:text-white"
                    >
                      {blog?.tag && Array.isArray(blog.tag) && blog.tag.length > 0 ? blog.tag[0] : 'Sweet Developers'}
                    </Link>
                  </div>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-medium xl:text-2xl">
                    <a
                      href={`/articles/${blog.slug}`} // Adjust the URL as needed
                      className="text-lg font-medium md:text-xl lg:text-xl"
                    >
                      {blog.title}
                    </a>
                    
                  </h2>
                  <p className="mt-2 text-muted dark:text-light/70">
                     {blog.short_description.slice(0,138)}...
                    </p>
                  <ul className="mt-4 flex flex-wrap items-center gap-2">
                    <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                      By <span className="text-primary"> Sweet Developers</span>
                    </li>
                    <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          {/* Previous Page Link */}
          {page > 1 && (
            <Link href={`/articles?page=${page - 1}`} className="px-4 py-2 bg-gray-300 text-dark rounded-lg">
              Previous
            </Link>
          )}

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i + 1}
              href={`/articles?page=${i + 1}`}
              className={`px-4 py-2 rounded-lg ${i + 1 === page ? 'bg-primary text-white' : 'bg-gray-300 text-dark'
                }`}
            >
              {i + 1}
            </Link>
          ))}

          {/* Next Page Link */}
          {page < totalPages && (
            <Link href={`/articles?page=${page + 1}`} className="px-4 py-2 bg-gray-300 text-dark rounded-lg">
              Next
            </Link>
          )}
        </div>
      </div>

    </>

  )
}

export default Articles


export async function generateMetadata() {
  // Disable caching for this page
  noStore();

  const data = await prisma.sEO.findFirst({
    where: { pagename: 'Articles' },
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
