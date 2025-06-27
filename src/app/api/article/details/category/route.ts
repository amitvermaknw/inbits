import { NextResponse } from 'next/server';
import { Article } from "@/src/interface/article";
import { fetchArticleById, fetchArticlesForCategoryAndDate } from './helper';
import { isValidImageUrl } from '@/src/utils/utils';

const MAX_DAYS_BACK = 5;
const MAX_ARTICLES = 10;
let totalDaysBack = 0;

export async function POST(request: Request) {
    try {
        const { currentDate, excludeIds = [], categories = [], selectedCategory, currentCategoryIndex = 0, articleId, slug } = await request.json();

        const finalArticles: Article[] = [];
        const nextDate = new Date(currentDate);
        let nextCategoryIndex = currentCategoryIndex;
        let isComplete = false;
        const seenIds = new Set(excludeIds);

        let nextSelectedCategory = selectedCategory;
        console.log(slug);

        const addArticles = (articles: Article[]) => {
            for (const article of articles) {
                if (!seenIds.has(article.articleId) && isValidImageUrl(article.urlToImage)) {
                    seenIds.add(article.articleId);
                    finalArticles.push(article);
                    if (finalArticles.length >= MAX_ARTICLES) return true;
                }
            }
            return false;
        };

        if (articleId) {
            const mainArticle = await fetchArticleById(articleId);
            if (mainArticle && mainArticle.length && !seenIds.has(mainArticle[0].articleId) && isValidImageUrl(mainArticle[0].urlToImage)) {
                finalArticles.push(mainArticle[0]);
                seenIds.add(mainArticle[0].articleId);
                nextSelectedCategory = mainArticle[0].summary?.category;
            }
        }

        if (nextSelectedCategory && finalArticles.length < MAX_ARTICLES) {
            const articles = await fetchArticlesForCategoryAndDate(nextSelectedCategory, nextDate);
            addArticles(articles)
        }

        while (finalArticles.length < MAX_ARTICLES && !isComplete && totalDaysBack <= MAX_DAYS_BACK) {
            const currentCategory = categories[nextCategoryIndex];

            //if (currentCategory !== nextSelectedCategory) {
            const articles = await fetchArticlesForCategoryAndDate(currentCategory, nextDate);
            addArticles(articles)
            //}

            nextCategoryIndex++;

            if (nextCategoryIndex >= categories.length) {
                nextCategoryIndex = 0;
                nextDate.setDate(nextDate.getDate() - 1);
                totalDaysBack++;
            }
        }

        if (totalDaysBack > MAX_DAYS_BACK || finalArticles.length < MAX_ARTICLES) {
            isComplete = true;
            totalDaysBack = 0;
        }

        return NextResponse.json({
            status: 200,
            msg: {
                articles: finalArticles,
                nextDate: nextDate,
                nextCategoryIndex: 0,
                isComplete
            }

        });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ msg: `Error getting documents: ${error.message}`, status: 500 });
        } else {
            return NextResponse.json({ msg: `Error getting documents: ${error}`, status: 500 });
        }
    }
}
