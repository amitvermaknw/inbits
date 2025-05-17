import { fetchArticleByCategory } from "@/src/services/getArticles";
import ClientPolitics from "./ClientPolitics";
import { PageLoader } from "@/src/components/ui/pageloader";
import { OPENGRAPH_IMAGE } from "@/src/utils/contants";
import { APP_BASE_URL } from "@/src/utils/config";
import { Metadata } from "next";
import { Article } from "@/src/interface/article";

export async function generateMetadata(): Promise<Metadata> {
    const result: { msg: Array<Article> | string, status: number } = await fetchArticleByCategory("politics", new Date());

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
                url: result.msg?.length && typeof result.msg === 'object' ? result.msg[0].urlToImage : OPENGRAPH_IMAGE,
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
            images: result.msg?.length && typeof result.msg === 'object' ? [result.msg[0].urlToImage] : OPENGRAPH_IMAGE,
        }
    };
}

export default async function Politics() {
    const result = await fetchArticleByCategory("politics", new Date());

    return (
        result.msg.length && typeof result.msg === 'object' ? <ClientPolitics allArticles={result.msg} /> : <PageLoader />
    )
}