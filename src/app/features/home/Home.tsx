import { fetchLatestNews } from "@/src/services/getLatestNews";
import Banner from "./component/Banner";
import LatestNews from "./component/Latest";
import MiddlePannel from "./component/MiddlePannel";
// import TopStories from "./component/TopStories";
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle, } from "@/src/components/ui/alert"
import { Article, ArticleProps } from "@/src/interface/article";

const getSideArticle = (props: ArticleProps): Array<Article> => {
    const sideArticle: Array<Article> = [];
    if (typeof props === 'object' && props.hasOwnProperty("technology")) {
        if (Array.isArray(props.technology)) {
            const validArticles = props.technology.slice(1, props.technology.length - 1).filter(Boolean);
            sideArticle.push(...validArticles);
        }
    }
    if (typeof props === 'object' && props.hasOwnProperty("science")) {
        if (Array.isArray(props.science)) {
            const validArticles = props.science.slice(1, props.science.length - 1).filter(Boolean);
            sideArticle.push(...validArticles);
        }
    }

    if (typeof props === 'object' && props.hasOwnProperty("science")) {
        if (Array.isArray(props.science)) {
            const validArticles = props.science.slice(1, props.science.length - 1).filter(Boolean);
            sideArticle.push(...validArticles);
        }
    }

    return sideArticle
}

export default async function HomePage() {
    const result = await fetchLatestNews('start', 40);

    let sidebarArticle: Array<Article> = []
    if (typeof result.msg === 'object' && result.msg !== null)
        sidebarArticle = await getSideArticle(result.msg);


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
                            <LatestNews {...result.msg} />
                        )}
                    </div>
                    <div className="px-2">
                        {typeof result.msg === 'object' && result.msg !== null && (
                            // <MiddlePannel {...result.msg} />
                            <MiddlePannel {...sidebarArticle} />
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

