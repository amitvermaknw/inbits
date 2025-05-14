import { fetchArticleByCategory } from "@/src/services/getArticles";
import ClientPolitics from "./ClientPolitics";
import { PageLoader } from "@/src/components/ui/pageloader";


export default async function Politics() {
    const result = await fetchArticleByCategory("politics", new Date());

    return (
        result.msg.length && typeof result.msg === 'object' ? <ClientPolitics allArticles={result.msg} /> : <PageLoader />
    )
}