import { fetchArticleByCategory } from "@/src/services/getArticles";
import ClientPage from "./ClientPage";
import { PageLoader } from "@/src/components/ui/pageloader";

export default async function Entertainment() {
    const result = await fetchArticleByCategory("entertainment", new Date());
    return (
        result.msg.length && typeof result.msg === 'object' ? <ClientPage allArticles={result.msg} />
            : <PageLoader />
    )
}