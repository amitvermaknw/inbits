export interface Article {
    source: { id: string, name: string },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string,
    summary?: { category: string, summary: string }
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