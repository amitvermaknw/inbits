import { NextResponse } from 'next/server';
// import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { db } from '../config/firebaseAdmin';
import axios, { AxiosResponse } from 'axios';
import { summarized } from '../../summarize/route';

const docPath = "inbits_collection/newsdata/articles";
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
        // const result: AxiosResponse<[]> = await axios.get<[]>(`${process.env.NEWDATA_END_POINT}/v2/top-headlines?country=us&apiKey=${process.env.NEWDATA_API_KEY}`);
        // if (result.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const results = require("./newdata.json");
        // const articles = result.data as Array<unknown>
        const batchPromises = results.articles.map(async (article: Article) => {
            if (article.content) {
                // const summary = await summarized(article.content);
                // Object.assign(article, { summary: summary });
                const snapshot = await db.collection(docPath).add(article);
                if (snapshot.id) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        await Promise.all(batchPromises);
        return NextResponse.json({ message: 'Articles saved to Firebase', count: results.articles.length, code: 200 }, { status: 200 });
        // } else {
        //     res.status(400).json({ message: 'Failed to save article response', count: 0 });
        // }
    } catch (error) {
        console.error(error);
        if (error instanceof Error)
            return NextResponse.json({ message: error.message, code: 500 }, { status: 500 });
    }
}
