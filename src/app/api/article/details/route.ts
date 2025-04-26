import { NextRequest, NextResponse } from "next/server";
import { db } from "../../config/firebaseAdmin";
import { Article } from "@/src/interface/article";
import { DocumentSnapshot } from "firebase-admin/firestore";

const docPath = "inbits_collection/us/articles";
const pageSize = 10;
let lastVisible: DocumentSnapshot | null = null;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const paramDate = searchParams.get("currentDate") as string;
        let currentCategory = searchParams.get("category") as string;
        const articleId = searchParams.get("articleId") as string;
        const slug = searchParams.get("slug");
        const currentDate = new Date(paramDate);
        const articles: Array<Article> = [];

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



        if (articleId && slug !== '') {
            const query = await db.collection(docPath).where("articleId", "==", articleId).get();
            const result = query.docs.map(doc => ({ ...doc.data() } as Article));
            if (result.length) {
                articles.push(...result);
            }
        }

        if (currentCategory === '' || currentCategory === null) {
            currentCategory = articles[0].summary?.category as string
        }


        let query = await db.collection(docPath)
            .where("summary.category", "==", currentCategory)
            .where("publishedAt", ">=", start)
            .where("publishedAt", "<=", end)
            .where("articleId", "!=", articleId)
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
        return NextResponse.json({
            status: 200,
            msg: articles
        });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ msg: `Error getting documents: ${error.message}`, status: 500 });
        } else {
            return NextResponse.json({ msg: `Error getting documents: ${error}`, status: 500 });
        }
    }
}
