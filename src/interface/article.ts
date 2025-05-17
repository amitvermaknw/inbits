export interface Article {
    articleId?: string,
    source: { id: string, name: string },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string | null,
    summary?: { category: string, summary: string, title: string },
    country?: string | null,
    slug?: string
}

export interface ArticleProps {
    business: Array<Article>,
    entertainment: Array<Article>,
    health: Array<Article>,
    others: Array<Article>,
    politics: Array<Article>,
    science: Array<Article>,
    sports: Array<Article>,
    technology: Array<Article>,
    world: Array<Article>,
}