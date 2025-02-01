import React, { lazy } from 'react';
const Footer = lazy(() => import("@/component/main/particals/Footer"));
const Header = lazy(() => import("@/component/main/particals/Header"));
const Intro = lazy(() => import('@/component/main/common/Intro'));


const Main2 = ({ children, pagename }) => {

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                (function() {
                  const storedTheme = localStorage.getItem('hs_theme');
                  const theme = storedTheme ? storedTheme : 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                })();
              `,
                    }}
                />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&display=swap" rel="stylesheet" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WCQS8LRG');
`,
                    }}
                />
            </head>
            <body className={`relative h-screen overflow-y-auto overflow-x-hidden bg-light text-dark dark:bg-dark-2 dark:text-light`}>
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>
                <div className="mx-auto flex max-w-screen-2xl flex-col justify-between gap-4 p-4 lg:gap-6 lg:p-6 lg:pb-0">
                    <Header />
                    <main className={pagename == '(home)' ? `grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6` : 'grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 reverce'}>
                        <Intro />
                        {children}

                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}

export default Main2;
