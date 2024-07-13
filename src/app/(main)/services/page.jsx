import Awards from '@/component/main/pages/services/Awards';
import FAQ from '@/component/main/pages/services/FAQ';
import FooterScroller from '@/component/main/pages/services/FooterScroller';
import Parner from '@/component/main/pages/services/Parner';
import Reviews from '@/component/main/common/Reviews';
import Services_Offered from '@/component/main/pages/services/Services_Offered';
import React, { lazy } from 'react'

const Services = () => {
    return (
        <>
            
            <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
                <Services_Offered />
                <Parner />
                <Reviews />
                <Awards />
                <FAQ />
                <FooterScroller />
            </div>
        </>
    )
}

export default Services