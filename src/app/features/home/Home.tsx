import { fetchLatestNews } from "@/src/services/getLatestNews";
import Banner from "./component/Banner";
import LatestNews from "./component/Latest";
import MiddlePannel from "./component/MiddlePannel";
// import TopStories from "./component/TopStories";
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle, } from "@/src/components/ui/alert"
import { Article, ArticleProps } from "@/src/interface/article";
import { HOME_PAGE_RECORDS } from "@/src/utils/contants";
import { OPENGRAPH_IMAGE } from "@/src/utils/contants";
import { APP_BASE_URL } from "@/src/utils/config";
import { Metadata } from "next";
import { fetchArticleByCategory } from "@/src/services/getArticles";

export async function generateMetadata(): Promise<Metadata> {
    const result: { msg: Array<Article> | string, status: number } = await fetchArticleByCategory("politics", new Date());
    const category = result.msg?.length && typeof result.msg === 'object' ? result.msg[0].summary?.category : 'Accross various categories';

    console.log("category=", category);
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


const getSideArticle = (props: ArticleProps): Array<Article> => {
    const sideArticle: Array<Article> = [];
    if (typeof props === 'object' && props.hasOwnProperty("technology")) {
        if (Array.isArray(props.technology)) {
            const validArticles = props.technology.slice(1, props.technology.length).filter(Boolean);
            sideArticle.push(...validArticles);
        }
    }
    if (typeof props === 'object' && props.hasOwnProperty("science")) {
        if (Array.isArray(props.science)) {
            const validArticles = props.science.slice(0, props.science.length).filter(Boolean);
            sideArticle.push(...validArticles);
        }
    }

    if (typeof props === 'object' && props.hasOwnProperty("health")) {
        if (Array.isArray(props.health)) {
            const validArticles = props.health.slice(0, props.health.length).filter(Boolean);
            sideArticle.push(...validArticles);
        }
    }

    if (typeof props === 'object' && props.hasOwnProperty("others")) {
        if (Array.isArray(props.others)) {
            const validArticles = props.others.slice(0, props.others.length).filter(Boolean);
            sideArticle.push(...validArticles);
        }
    }

    return sideArticle
}

const getLatestArticle = (props: ArticleProps): Array<Article> => {

    const latestArticle: Array<Article> = [];

    if (typeof props === 'object' && props.hasOwnProperty("politics")) {
        if (Array.isArray(props.politics)) {
            //const validArticles = props.politics.slice(4, props.politics.length).filter(Boolean); //4
            // latestArticle.push(...validArticles);
            latestArticle.push(...props.politics);
        }
    }
    if (typeof props === 'object' && props.hasOwnProperty("sports")) {
        if (Array.isArray(props.sports)) {
            // const validArticles = props.sports.slice(3, props.sports.length).filter(Boolean); //3
            // latestArticle.push(...validArticles);
            latestArticle.push(...props.sports);
        }
    }

    if (typeof props === 'object' && props.hasOwnProperty("entertainment")) {
        if (Array.isArray(props.entertainment)) {
            // const validArticles = props.entertainment.slice(2, props.entertainment.length).filter(Boolean); //2
            // latestArticle.push(...validArticles);
            latestArticle.push(...props.entertainment);
        }
    }

    // if (typeof props === 'object' && props.hasOwnProperty("technology")) {
    //     if (Array.isArray(props.technology)) {
    //         // const validArticles = props.technology.slice(1, props.technology.length).filter(Boolean);
    //         // latestArticle.push(...validArticles);
    //         latestArticle.push(...props.technology);
    //     }
    // }

    if (typeof props === 'object' && props.hasOwnProperty("business")) {
        if (Array.isArray(props.business)) {
            // const validArticles = props.business.slice(1, props.business.length).filter(Boolean);
            // latestArticle.push(...validArticles);
            latestArticle.push(...props.business);
        }
    }

    if (typeof props === 'object' && props.hasOwnProperty("world")) {
        if (Array.isArray(props.world)) {
            // const validArticles = props.world.slice(0, props.world.length).filter(Boolean);
            // latestArticle.push(...validArticles);
            latestArticle.push(...props.world);
        }
    }
    return latestArticle
}

export default async function HomePage() {
    const result = await fetchLatestNews('start', HOME_PAGE_RECORDS);

    let sidebarArticle: Array<Article> = []
    if (typeof result.msg === 'object' && result.msg !== null)
        sidebarArticle = await getSideArticle(result.msg);

    let latestArticle: Array<Article> = []
    if (typeof result.msg === 'object' && result.msg !== null) {
        latestArticle = await getLatestArticle(result.msg);
    }

    return (
        <>
            {result.status === 200 ? <section>
                {typeof result.msg === 'object' && result.msg !== null && (
                    <Banner {...result.msg} />
                )}
                {/* <TopStories /> */}
                <section className="mx-auto grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    <div className="sm:col-span-2 px-2">
                        {typeof result.msg === 'object' && result.msg !== null && (
                            <LatestNews art={latestArticle} />
                        )}
                    </div>
                    <div className="px-2">
                        {typeof result.msg === 'object' && result.msg !== null && (
                            <MiddlePannel art={sidebarArticle} />
                        )}
                    </div>
                </section>
            </section> :
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        We are in maintenance phase, we will resume shortly.
                    </AlertDescription>
                </Alert>
            }
        </>
    )
}

