import Axios from '@/Helpers/Axios'
import { Center, Spinner, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function username() {

    const router = useRouter()
    const toast = useToast()

    useEffect(() => {

        if (router?.query?.username) {
            handleVerify(router?.query?.username)
            setTimeout(() => {
                window.location.href = `/`
            }, 500)
        }

    }, [router?.query])

    const handleVerify = async (username) => {
        if (!username) {
            return alert('Please enter a username')
        }

        const res = await Axios.get(`/sponsor/validate/${username}`)

        if (!res?.data?.ok) {

            return toast({
                title: 'Sponsor verification failed',
                description: "",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })

        }
        else {

            Cookies.set('sponsor', username)

            toast({
                title: 'Sponsor verified',
                description: "",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

            setTimeout(() => {
                window.location.href = `/`
            }, 500)
        }
    }

    return (
        <Center h={'100vh'}>
            <Spinner />
        </Center>
    )
}
