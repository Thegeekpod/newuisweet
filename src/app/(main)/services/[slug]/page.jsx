import { unstable_noStore as noStore } from 'next/cache';
import prisma from '../../../../../lib/prisma';
import Link from 'next/link';
import FAQ from '@/component/main/common/FAQ';
import ContactFormSubmit from '@/component/main/pages/contact/ContactFormSubmit';

// Function to generate SEO metadata and structured data
export async function generateMetadata({ params }) {
  // Disable caching for this page
  noStore();

 
  const slug = params.slug;

  // Fetch the service post from the database using Prisma
  const service = await prisma.services.findUnique({
    where: { slug: slug },
  });

  // If no data is found, return default metadata for 404 page
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
      alternates: {
        canonical: `${process.env.BASE_URL}/404`,
      },
      openGraph: {
        type: 'article',
        title: 'Service Not Found',
        description: 'The requested service could not be found.',
        url: `${process.env.BASE_URL}/404`,
        images: [
          {
            url: `${process.env.BASE_URL}/logo.png`, // Default image for 404
            width: 800,
            height: 600,
            alt: 'Service Not Found',
          },
        ],
      },
      structuredData: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: 'Service Not Found',
        description: 'The requested service could not be found.',
      }),
    };
  }

  // Define schema.org structured data for the service


  // Return metadata including all SEO fields
  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.description,
    alternates: {
      canonical: `${process.env.BASE_URL}/services/${service.slug}`,
    },
    openGraph: {
      type: 'article',
      title: service.seoTitle || service.title,
      description: service.seoDescription || service.description,
      url: `${process.env.BASE_URL}/services/${service.slug}`,
      images: [
        {
          url: service.bannerImage ? `${process.env.BASE_URL}${service.bannerImage}` : `${process.env.BASE_URL}/logo.png`,
          width: 1200,
          height: 628,
          alt: service.seoTitle || service.title,
        },
      ],
    },
   
  };
}

// Main service page component
export default async function Page({ params }) {
  noStore();
  const slug = params.slug;

  // Fetch service details including FAQs
  const service = await prisma.services.findUnique({
    where: { slug: slug },
    include: { faqs: true },
  });

  if (!service) {
    return <p>No service data available.</p>;
  }

  // Fetch related services based on tag or categories
  const relatedServices = await prisma.services.findMany({
    where: { slug: { not: slug } },
    take: 4, // Limit to 4 related posts
  });
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription || service.description,
    image: service.bannerImage ? `${process.env.BASE_URL}${service.bannerImage}` : `${process.env.BASE_URL}/logo.png`,
    url: `${process.env.BASE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: "Sweet Developers",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.BASE_URL}/logo.png`,
        width: 600,
        height: 60,
      },
    },
  };
  const jsonSchema = JSON.stringify(schema);
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: (service?.schema || jsonSchema) }}
      />
    <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
      {/* Banner Image */}
      <figure className="aspect-video overflow-hidden rounded-lg">
        <img
          src={service.bannerImage}
          alt={service.title || "Service Image"}
          className="h-full w-full object-cover"
        />
      </figure>

      {/* Service Description */}
      <article className="max-w-full lg:mt-6 ">
        {/* <h1 className='text-2xl font-medium text-dark dark:text-light lg:text-2xl'>{service.title}</h1> */}
        <div className='prose-content max-w-full lg:text-justify'
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
      </article>

      <hr />

      {/* Contact Form */}
      <h3 className="text-2xl mt-3 font-semibold leading-tight text-dark dark:text-light lg:text-3xl lg:leading-tight">
        Enquire Now
      </h3>
      <ContactFormSubmit service={service.title} />

      {service?.faqs.length > 0 && <hr />}

      {/* FAQ Section */}
      {service?.faqs.length > 0 &&
      
     ( <><h3 className="text-2xl font-semibold dark:text-light mt-10 lg:mt-10">
      Frequently Asked Questions
    </h3>
      <FAQ data={service.faqs} />
      </>
      )
      
      }

      {service?.faqs.length > 0 && <hr className='mt-10' />}

      {/* Related Services */}
      {/* <div className="mt-10 lg:mt-14">
        <h3 className="text-2xl font-semibold leading-tight text-dark dark:text-light lg:text-3xl lg:leading-tight">
          Popular Services
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-8">
          {relatedServices.map((related) => (
            <div className="" key={related.id}>
              <div className="relative">
                <Link href={`/services/${related.slug}`} className="group block aspect-6/4 overflow-hidden rounded-lg">
                  <img src={related.bannerImage} alt={related.title} className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105" />
                </Link>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-medium xl:text-2xl">
                  <Link href={`/services/${related.slug}`} className="inline-block text-dark transition hover:text-primary dark:text-light/70 dark:hover:text-primary">
                    {related.title}
                  </Link>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
    </>
  );
}
