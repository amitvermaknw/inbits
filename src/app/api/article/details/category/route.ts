import { NextRequest, NextResponse } from "next/server";
// import { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { db } from "../../../config/firebaseAdmin";
import { Article } from "@/src/interface/article";
import { BUSINESS, ENTERTAINMENT, HEALTH, OTHERS, POLITICS, SCIENCE, SPORTS, TECHNOLOGY, WORLD } from "@/src/utils/contants";

const docPath = "inbits_collection/us/articles";
let category = [POLITICS, SPORTS, ENTERTAINMENT, TECHNOLOGY, BUSINESS, HEALTH, SCIENCE, WORLD, OTHERS];

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const paramDate = searchParams.get("currentDate") as string;
        let currentCategory = searchParams.get("category") as string;
        const articleId = searchParams.get("articleId") as string;
        const currentDate = new Date(paramDate);
        const modifiedCategory = category.map(item => item !== currentCategory ? item : undefined).filter(data => data !== undefined);

        //Get latest categories
        if (!modifiedCategory.includes(currentCategory)) {
            currentCategory = modifiedCategory[0];
        }

        if (modifiedCategory.length) {
            currentDate.setDate(currentDate.getDate() - 1);
        }

        const start = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            0, 0, 0, 0
        ).toISOString();

        const end = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            23, 59, 59, 999
        ).toISOString();

        const snapshot = await db.collection(docPath)
            .where("category", "==", currentCategory)
            .where("publishedAt", ">=", start)
            .where("publishedAt", "<=", end)
            .where("articleId", "!=", articleId)
            .orderBy("publishedAt", "desc")
            .get();

        const result = snapshot.docs.map(doc => ({ ...doc.data() } as Article));
        category = modifiedCategory;

        return NextResponse.json({
            status: 200,
            msg: result
        });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ msg: `Error getting documents: ${error.message}`, status: 500 });
        } else {
            return NextResponse.json({ msg: `Error getting documents: ${error}`, status: 500 });
        }
    }
}
