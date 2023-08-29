import Axios from '@/Helpers/Axios'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

export default function HomeLayout({ children }) {

    const [sponsor, setSponsor] = useState(null)

    useEffect(() => {
        async function getSponsor() {

            const username = Cookies.get('sponsor')

            const res = await Axios.get(`/sponsor/validate/${username}`)

            // console.log('Sponsor data: ', res.data)

            if (res?.data?.ok) {
                setSponsor(res?.data?.user)
            }
        }

        getSponsor()
    }, [])

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
                <script src="/facebook-pixel.js"></script>
            </Head>


            {children}

            {sponsor && <Box as='section' position={'fixed'} zIndex='9999' bottom='12px' left='12px' bg='white' shadow={'md'} px='3' py={1} rounded='full'>
                <Flex gap={2} alignItems='center'>
                    <Avatar size='sm' src={sponsor?.avatar} />
                    <Box lineHeight={1}>
                        <Text mb={0} fontSize={'9px'} color='gray.500'>Referred by</Text>
                        <Text as={'span'} lineHeight={0} fontSize={'14px'}>{sponsor.full_name}</Text>
                    </Box>

                </Flex>
            </Box>}
        </>
    )
}
