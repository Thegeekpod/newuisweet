import FAQ from '@/component/main/pages/services/FAQ';
import FooterScroller from '@/component/main/pages/services/FooterScroller';
import Reviews from '@/component/main/common/Reviews';
import Services_Offered from '@/component/main/pages/services/Services_Offered';
import React, { lazy } from 'react'
import prisma from '../../../../lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';
const Services = async() => {
    noStore();
    var isLoading = true;
    const data = await prisma.services.findMany({
        orderBy:{
            id:'desc',
        }
    })
    if(data.length >0){
        isLoading = false;
    }
    return (
        <>
            
            <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
                <Services_Offered data={data} isLoading={isLoading}/>
                <Reviews />
                
                <FAQ />
                <FooterScroller />
            </div>
        </>
    )
}

export default Services