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