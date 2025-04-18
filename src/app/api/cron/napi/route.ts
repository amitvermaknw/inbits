import { NextResponse } from 'next/server';
import { db } from '../../config/firebaseAdmin';
import axios, { AxiosResponse } from 'axios';
import { summarized } from '../../summarize';
import { fetchArticleContent } from '../content/readContent';
import { NEWSAPI_END_POINT } from '@/src/utils/config';
import { Article } from '@/src/interface/article';

const docPath = "inbits_collection/us/articles";
const logsDocPath = "inbits_collection/newsapi/logs";

export async function GET(req: Request) {

    const url = new URL(req.url);
    const secret = url.searchParams.get('secret');
    const country = url.searchParams.get('country');

    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ message: 'Unauthorized', code: 401 }, { status: 401 });
    }

    try {
        const result: AxiosResponse<[]> = await axios.get<[]>(`${NEWSAPI_END_POINT}/v2/top-headlines?country=${country}&pageSize=100&category=politics&category=sports&category=business&category=entertainment&category=technology&apiKey=${process.env.NEWSAPI_API_KEY}`);
        if (result.status === 200) {
            // const results = require("./newdata.json");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const results: any = result.data;
            if (results.hasOwnProperty("articles")) {
                const batchPromises = results.articles.map(async (article: Article) => {
                    if (article.url) {
                        const content = await fetchArticleContent(article.url);
                        if (content.code === 200 && content.msg) {
                            if (content) {
                                let summary = await summarized(content.msg);
                                if (summary?.code === 200) {
                                    summary = JSON.parse(summary?.message as string);
                                    Object.assign(article, { summary: summary });
                                    article.content = null;
                                    article.country = country;
                                    const snapshot = await db.collection(docPath).add(article);
                                    if (snapshot.id) {
                                        return true;
                                    } else {
                                        console.log("Not able to add in db=", snapshot);
                                        await db.collection(logsDocPath).add(snapshot);
                                        return false;
                                    }
                                } else {
                                    await db.collection(logsDocPath).add(summary);
                                }

                            } else {
                                console.log('Failed to extract article content.', content);
                                await db.collection(logsDocPath).add({ message: `Not able to fetch article content=${content}` });
                            }
                        }
                    }
                });
                await Promise.all(batchPromises);
            }

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
