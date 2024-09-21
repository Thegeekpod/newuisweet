import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the number of items per page
const PER_PAGE = 5;

const ProjectsPage = async ({ searchParams }) => {
    const page = parseInt(searchParams?.page) || 1; // Get current page from query param or default to 1
    const skip = (page - 1) * PER_PAGE;

    // Fetch the projects with pagination
    const projects = await prisma.projects.findMany({
        orderBy: {
            id: 'desc',
        },
        take: PER_PAGE, // Number of projects per page
        skip: skip,     // Skip the previous pages' items
    });

    // Get total count of projects for pagination calculation
    const totalProjects = await prisma.projects.count();
    const totalPages = Math.ceil(totalProjects / PER_PAGE);

    return (
        <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
            <div>
                <h2 className="text-3xl font-semibold leading-tight text-dark dark:text-light lg:text-[40px] lg:leading-tight">
                    Check Out Our Latest <span className="text-primary">Projects</span>
                </h2>
                <p className="mt-4 text-lg text-muted dark:text-light/70">
                    I{"'"}m here to help if you{"'"}re searching for a product designer to bring your
                    idea to life or a design partner to help take your business to the next level.
                </p>
            </div>

            {/* Portfolio */}
            <div className="mt-10 lg:mt-14">
                <div className="grid grid-cols-1 gap-6 mt-6">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative overflow-hidden rounded-lg bg-light p-4 pb-0 dark:bg-dark-2 md:p-6 xl:p-10">
                            <div className="relative aspect-6/4 overflow-hidden rounded-t-lg">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full rounded-t-lg object-cover object-top transition"
                                />
                                <a
                                    href={project.url}
                                    target="_blank"
                                    className="project-gallery-link absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full bg-white text-primary shadow-lg transition lg:invisible lg:-translate-y-[40%] lg:opacity-0 lg:group-hover:visible lg:group-hover:-translate-y-1/2 lg:group-hover:opacity-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        className="h-6 w-6"
                                    >
                                        <path d="M10 4.167v11.666M4.167 10h11.666" />
                                    </svg>
                                </a>
                            </div>
                            <div className="flex flex-wrap items-start justify-between py-4 md:p-6">
                                <div>
                                    <h3 className="text-lg font-medium md:text-xl lg:text-2xl">
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            className="border-b border-transparent text-dark transition hover:border-b-primary hover:text-primary dark:text-light/80 dark:hover:text-primary"
                                        >
                                            {project.title}
                                        </a>
                                    </h3>
                                    <p className="text-sm text-muted lg:text-base">
                                        {/* Fixed HTML structure: No <div> inside <p> */}
                                        <span dangerouslySetInnerHTML={{ __html: project.description }} />
                                    </p>
                                </div>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    className="inline-flex items-center justify-center gap-1 rounded bg-white px-3 py-2 text-center text-sm leading-none text-dark transition hover:text-primary dark:bg-black dark:text-light/70 dark:hover:text-primary"
                                >
                                    <span>Visit Site</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 14 15"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 shrink-0"
                                    >
                                        <path d="m9.917 4.583-5.834 5.834m.584-5.834h5.25v5.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-4 mt-8">
    {/* Previous Page Link */}
    {page > 1 && (
        <Link href={`/projects?page=${page - 1}`} className="px-4 py-2 bg-gray-300 text-dark rounded-lg">
            Previous
        </Link>
    )}

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => (
        <Link
            key={i + 1}
            href={`/projects?page=${i + 1}`}
            className={`px-4 py-2 rounded-lg ${
                i + 1 === page ? 'bg-primary text-white' : 'bg-gray-300 text-dark'
            }`}
        >
            {i + 1}
        </Link>
    ))}

    {/* Next Page Link */}
    {page < totalPages && (
        <Link href={`/projects?page=${page + 1}`} className="px-4 py-2 bg-gray-300 text-dark rounded-lg">
            Next
        </Link>
    )}
</div>

        </div>
    );
};

export default ProjectsPage;
