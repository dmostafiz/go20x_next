import Head from 'next/head'
import React from 'react'

export default function HomeLayout({ children }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png" />
                <title>GO20X - Xcelerate International</title>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
                <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="/css/style.css" />
                <link rel="stylesheet" type="text/css" href="/css/responsive.css" />
               
                <script src="/js/jquery.js"></script>
                <script src="/js/bootstrap.min.js"></script>
                <script src="/js/custom.js"></script>
            </Head>


            {children}
        </>
    )
}
