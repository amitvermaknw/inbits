import { Metadata } from "next";
import { Article } from '@/src/interface/article';
import { fetchArticleById } from '@/src/services/getArticles';
import { APP_BASE_URL } from "@/src/utils/config";
import LatestClient from "./LatestClient";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const result: { msg: Array<Article> | string, status: number } = await fetchArticleById(params.id as string);
    const category = result.msg?.length && typeof result.msg === 'object' ? result.msg[0].summary?.category : 'Accross various categories'
    return {
        title: result.msg?.length && typeof result.msg === 'object' ? result.msg[0].title : 'Latest News',
        description: result.msg?.length && typeof result.msg === 'object' ? result.msg[0].description : 'Stay updated with the latest news across various categories.',
        openGraph: {
            title: result.msg?.length && typeof result.msg === 'object' ? result.msg[0].title : `${category} latest news in 60 seconds`,
            description: result.msg?.length && typeof result.msg === 'object' ? result.msg[0].description : `Stay updated with the latest news on ${category} in just 60 seconds`,
            siteName: 'InBits.co',
            type: 'article',
            images: [{
                url: result.msg?.length && typeof result.msg === 'object' ? result.msg[0].urlToImage : 'https://res.cloudinary.com/dxhnwasub/image/upload/v1747003467/inbits/ajpjmilvkxnthsedtetv.png',
                width: 1200,
                height: 630,
                alt: result.msg?.length && typeof result.msg === 'object' ? result.msg[0].title : 'Latest News',
            }
            ],
            url: result.msg?.length && typeof result.msg === 'object' ? result.msg[0].url : `${APP_BASE_URL}`,
        },
        twitter: {
            card: "summary_large_image",
            title: result.msg?.length && typeof result.msg === 'object' ? result.msg[0].title : `${category} latest news in 60 seconds`,
            description: result.msg?.length && typeof result.msg === 'object' ? result.msg[0].description : `Stay updated with the latest news on ${category} in just 60 seconds`,
            images: result.msg?.length && typeof result.msg === 'object' ? [result.msg[0].urlToImage] : 'https://res.cloudinary.com/dxhnwasub/image/upload/v1747003467/inbits/ajpjmilvkxnthsedtetv.png',
        }
    };
}

export default function Details({ params }: { params: { id: string } }) {
    return (<LatestClient fetchWithArticleId={params.id} />)
}