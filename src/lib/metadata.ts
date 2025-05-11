import { Metadata } from "next";

export async function generateMetadata(article: {
    title: string,
    summary: string,
    image: string
}): Promise<Metadata> {

    return {
        metadataBase: new URL('https://www.inbits.co'),
        title: article?.title || 'Best Daily News in 60 seconds',
        description: article?.summary || 'Latest and breaking news across categories in 60 seconds.',
        openGraph: {
            title: article?.title,
            description: article?.summary,
            images: article?.image || 'https://res.cloudinary.com/dxhnwasub/image/upload/v1747003467/inbits/ajpjmilvkxnthsedtetv.png',
        },
        twitter: {
            card: 'summary_large_image',
            title: article?.title,
            description: article?.summary,
            images: ['https://res.cloudinary.com/dxhnwasub/image/upload/v1747003467/inbits/ajpjmilvkxnthsedtetv.png'],
        },
    };
}