import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'

export default function GoogleTranslator() {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en",
                autoDisplay: false
            },
            "google_translate_element"
        );
    };
    useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    return (
        <Box zIndex={50} top={2} shadow={'md'} right={10} p={2} bg={'white'}>
            <div id="google_translate_element"></div>
        </Box>
    )
}
