import { NextResponse } from 'next/server';
import { db } from '../../config/firebaseAdmin';
import axios, { AxiosResponse } from 'axios';
import { summarized } from '../../summarize';
import { fetchArticleContent } from '../content/readContent';
import { NEWSAPI_END_POINT } from '@/src/utils/config';
import { Article } from '@/src/interface/article';
import { generateSlug } from '@/src/utils/slug';
import { slugId } from '@/src/utils/utils';

const docPath = "inbits_collection/us/articles";
const logsDocPath = "inbits_collection/newsapi/logs";
// import res from './newdata.json';

export async function GET(req: Request) {

    const url = new URL(req.url);
    const secret = url.searchParams.get('secret');
    const country = url.searchParams.get('country');

    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ message: 'Unauthorized', code: 401 }, { status: 401 });
    }

    try {
        const result: AxiosResponse<[]> = await axios.get<[]>(`${NEWSAPI_END_POINT}/v2/top-headlines?country=${country}&pageSize=50&category=politics&category=sports&category=business&category=entertainment&category=technology&apiKey=${process.env.NEWSAPI_API_KEY}`);
        if (result.status === 200) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const results: any = result.data;
            if (results.hasOwnProperty("articles")) {
                const batchPromises = results.articles.map(async (article: Article) => {
                    if (article.url) {

                        const querySnapshot = await db
                            .collection(docPath)
                            .where("url", "==", article.url)
                            .get();

                        if (querySnapshot.empty) {
                            const content = await fetchArticleContent(article.url);
                            if (content.code === 200 && content.msg) {
                                if (content) {
                                    const articleId = slugId();
                                    const slug = generateSlug(article.title, articleId);

                                    if (typeof content.msg === "string" && content.msg.trim().split(/\s+/).length > 100) {
                                        const summary = await summarized(content.msg);
                                        if (summary?.code === 200) {
                                            const parseMessage = JSON.parse(summary?.message as string) as { summary: string, category: string, title: string };
                                            const modifiedSummary = { ...parseMessage, category: parseMessage.category.toLowerCase() };
                                            Object.assign(article, { summary: modifiedSummary });
                                            article.content = null;
                                            article.country = country;
                                            article.articleId = articleId;
                                            article.slug = slug;
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
                                        Object.assign(article, { summary: { summary: content.msg, category: "others" } });
                                        article.content = null;
                                        article.country = country;
                                        article.articleId = articleId;
                                        article.slug = slug;
                                        const snapshot = await db.collection(docPath).add(article);
                                        if (snapshot.id) {
                                            return true;
                                        } else {
                                            console.log("Not able to add in db=", snapshot);
                                            await db.collection(logsDocPath).add(snapshot);
                                            return false;
                                        }
                                    }

                                } else {
                                    await db.collection(logsDocPath).add({ message: `Not able to fetch article content=${content}` });
                                }
                            }
                        } else {
                            console.log("Article with this URL already exists. Skipping add.");
                        }

                    }
                });
                await Promise.all(batchPromises);

                return NextResponse.json({ message: 'Articles saved to Firebase', count: results.articles.length, code: 200 }, { status: 200 });
            } else {
                console.log(`No record fetched from News API in result`)
                return NextResponse.json({ message: typeof results === 'object' ? JSON.stringify(results) : results, count: results.articles.length, code: 400 }, { status: 400 });
            }
        } else {
            return NextResponse.json({ message: 'Failed to get article from News API', count: result, code: 400 }, { status: 400 });
        }
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ message: error.message, code: 500 }, { status: 500 });
    }
}
