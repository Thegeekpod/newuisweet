import FAQ from '@/component/main/pages/services/FAQ';
import FooterScroller from '@/component/main/pages/services/FooterScroller';
import Reviews from '@/component/main/common/Reviews';
import Services_Offered from '@/component/main/pages/services/Services_Offered';
import React, { lazy } from 'react'
import prisma from '../../../../lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';
import GetSpecialized from '@/component/main/common/GetSpecialized';
const Services = async () => {
    noStore();
    //services
    var isLoading = true;
    const data = await prisma.services.findMany({
        orderBy: {
            id: 'desc',
        }
    })


    //faqs
    const faq = await prisma.servicesFaq.findMany({
        orderBy: {
            id: 'desc',
        },
    });
    const shuffledFaqs = faq.sort(() => 0.5 - Math.random());
    const randomFaqs = shuffledFaqs.slice(0, 5);
//specialized
const specialized = await prisma.specialized.findMany({
    orderBy: {
        id: 'desc',
    },

});

    if (data.length > 0) {
        isLoading = false;
    }
    return (
        <>

            <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
                <Services_Offered data={data} isLoading={isLoading} />

                <div className="mt-10 lg:mt-14">
                    <h3 className="text-2xl font-medium text-dark dark:text-light lg:text-3xl">
                        Our Specialized Fields ✨ Worldwide
                    </h3>
                    <GetSpecialized data={specialized} layout={6}/>

                </div>
                <Reviews />

                <FAQ data={randomFaqs} />
                <FooterScroller />
            </div>
        </>
    )
}

export default Services