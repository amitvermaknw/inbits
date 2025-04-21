import { NextRequest, NextResponse } from "next/server";
// import { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { db } from "../../../config/firebaseAdmin";
import { Article } from "@/src/interface/article";

const docPath = "inbits_collection/us/articles";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const paramDate = searchParams.get("currentDate") as string;
        const currentDate = new Date(paramDate);

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


        // Firestore query
        const snapshot = await db.collection(docPath)
            .where("category", "==", category)
            .where("publishedAt", ">=", start)
            .where("publishedAt", "<=", end)
            .orderBy("publishedAt", "desc")
            .get();

        const result = snapshot.docs.map(doc => ({ articleId: doc.id, ...doc.data() } as Article));
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
