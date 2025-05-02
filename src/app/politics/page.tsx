import { Skeleton } from "@/src/components/ui/skeleton";
import { fetchArticleByCategory } from "@/src/services/getArticles";
import ClientPolitics from "./ClientPolitics";


export default async function Politics() {
    const result = await fetchArticleByCategory("politics", new Date());

    return (
        result.msg.length && typeof result.msg === 'object' ? <ClientPolitics allArticles={result.msg} /> : <Skeleton />
    )
}