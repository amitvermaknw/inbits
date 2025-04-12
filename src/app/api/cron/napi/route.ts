import { NextResponse } from 'next/server';
// import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { db } from '../../config/firebaseAdmin';
import axios, { AxiosResponse } from 'axios';
import { summarized } from '../../summarize';
import { fetchArticleContent } from '../content/readContent';

const docPath = "inbits_collection/newsapi/articles";
// let lastVisibleData: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;

interface Article {
    source: { id: string, name: string },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

export async function GET(req: Request) {

    const url = new URL(req.url);
    const secret = url.searchParams.get('secret');

    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ message: 'Unauthorized', code: 401 }, { status: 401 });
    }

    try {
        const result: AxiosResponse<[]> = await axios.get<[]>(`${process.env.NEWSAPI_END_POINT}/v2/top-headlines?country=us&category=politics&category=sports&category=business&category=entertainment&category=technology&apiKey=${process.env.NEWSAPI_API_KEY}`);
        if (result.status === 200) {
            // const results = require("./newdata.json");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const results: any = result.data;
            const ar = [];
            ar.push(results.articles[0])
            ar.push(results.articles[1])

            const batchPromises = ar.map(async (article: Article) => {
                if (article.url) {
                    const content = await fetchArticleContent(article.url);
                    if (content) {
                        let summary = await summarized(content);
                        if (summary?.code === 200) {
                            summary = JSON.parse(summary?.message as string);
                            Object.assign(article, { summary: summary });
                            const snapshot = await db.collection(docPath).add(article);
                            if (snapshot.id) {
                                return true;
                            } else {
                                return false;
                            }
                        }

                    } else {
                        console.log('Failed to extract article content.');
                    }
                }
            });

            await Promise.all(batchPromises);
            return NextResponse.json({ message: 'Articles saved to Firebase', count: results.articles.length, code: 200 }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Failed to save article response', count: 0, code: 400 }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        if (error instanceof Error)
            return NextResponse.json({ message: error.message, code: 500 }, { status: 500 });
    }
}
