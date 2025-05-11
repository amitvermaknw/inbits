import { fetchLatestNews } from "@/src/services/getLatestNews";
import Banner from "./component/Banner";
import LatestNews from "./component/Latest";
import MiddlePannel from "./component/MiddlePannel";
// import TopStories from "./component/TopStories";
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle, } from "@/src/components/ui/alert"
import { Article, ArticleProps } from "@/src/interface/article";
import { generateMetadata } from "@/src/lib/metadata";
import { splitIntoChunks } from "@/src/utils/utils";

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
            const validArticles = props.politics.slice(4, props.politics.length).filter(Boolean); //4
            latestArticle.push(...validArticles);
        }
    }
    if (typeof props === 'object' && props.hasOwnProperty("sports")) {
        if (Array.isArray(props.sports)) {
            const validArticles = props.sports.slice(3, props.sports.length).filter(Boolean); //3
            latestArticle.push(...validArticles);
        }
    }

    if (typeof props === 'object' && props.hasOwnProperty("entertainment")) {
        if (Array.isArray(props.entertainment)) {
            const validArticles = props.entertainment.slice(2, props.entertainment.length).filter(Boolean); //2
            latestArticle.push(...validArticles);
        }
    }

    if (typeof props === 'object' && props.hasOwnProperty("technology")) {
        if (Array.isArray(props.technology)) {
            const validArticles = props.technology.slice(1, props.technology.length).filter(Boolean);
            latestArticle.push(...validArticles);
        }
    }

    if (typeof props === 'object' && props.hasOwnProperty("business")) {
        if (Array.isArray(props.business)) {
            const validArticles = props.business.slice(1, props.business.length).filter(Boolean);
            latestArticle.push(...validArticles);
        }
    }

    if (typeof props === 'object' && props.hasOwnProperty("world")) {
        if (Array.isArray(props.world)) {
            const validArticles = props.world.slice(0, props.world.length).filter(Boolean);
            latestArticle.push(...validArticles);
        }
    }

    if (latestArticle.length) {
        generateMetadata({
            title: latestArticle[0].title,
            summary: splitIntoChunks(latestArticle[0].description),
            image: latestArticle[0].urlToImage
        });
    }
    return latestArticle
}

export default async function HomePage() {
    const result = await fetchLatestNews('start', 40);

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

