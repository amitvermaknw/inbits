import { NextRequest, NextResponse } from "next/server";
import { db } from "../../config/firebaseAdmin";
import { Article } from "@/src/interface/article";
import { DocumentSnapshot } from "firebase-admin/firestore";

const docPath = "inbits_collection/us/articles";
const pageSize = 30;
let lastVisible: DocumentSnapshot | null = null;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const paramDate = searchParams.get("currentDate") as string;
        let currentCategory = searchParams.get("category") as string;
        const currentDate = new Date(paramDate);
        const articles: Array<Article> = [];
        let daysTried = 0;
        const maxDaysBack = 10;

        while (articles.length < pageSize && daysTried < maxDaysBack) {
            const start = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - 1,
                0, 0, 0, 0
            ).toISOString();

            const end = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                23, 59, 59, 999
            ).toISOString();

            if (currentCategory === '' || currentCategory === null) {
                currentCategory = articles[0].summary?.category as string
            }

            let query = await db.collection(docPath)
                .where("summary.category", "==", currentCategory)
                .where("publishedAt", ">=", start)
                .where("publishedAt", "<=", end)
                .orderBy("publishedAt", "desc")
                .limit(pageSize)

            if (lastVisible) {
                query = query.startAfter(lastVisible);
            }

            const snapshot = await query.get();
            lastVisible = snapshot.docs[snapshot.docs.length - 1] ?? null;

            const result = snapshot.docs.map(doc => ({ ...doc.data() } as Article));

            if (result.length) {
                articles.push(...result);
            }

            if (snapshot.size < (pageSize - articles.length)) {
                currentDate.setDate(currentDate.getDate() - 1);
                lastVisible = null;
                daysTried++;
            }
        }

        const uniqueArticles = Array.from(
            new Map(articles.map(article => [article.articleId, article])).values()
        );

        return NextResponse.json({
            status: 200,
            msg: uniqueArticles
        });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ msg: `Error getting documents: ${error.message}`, status: 500 });
        } else {
            return NextResponse.json({ msg: `Error getting documents: ${error}`, status: 500 });
        }
    }
}
