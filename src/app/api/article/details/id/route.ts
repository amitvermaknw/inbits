import { NextRequest, NextResponse } from "next/server";
import { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { db } from "../../../config/firebaseAdmin";

const docPath = "inbits_collection/us/articles";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const articleId = searchParams.get("articleId");
        const slug = searchParams.get("slug");

        let query: QuerySnapshot<DocumentData, DocumentData> | undefined = undefined;
        query = await db.collection(docPath).where("articleId", "==", articleId).get() || await db.collection(docPath).where("slug", "==", slug).get();

        const result = [];
        for (const doc of query?.docs ? query.docs : []) {
            const documentData = doc.data();
            documentData['documentId'] = doc.id;
            result.push(documentData)
        }

        if (result.length) {
            return NextResponse.json({
                status: 200,
                msg: result
            });
        }

        return NextResponse.json({
            status: 400,
            msg: "Sorry!!! No article found."
        });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ msg: `Error getting documents: ${error.message}`, status: 500 });
        } else {
            return NextResponse.json({ msg: `Error getting documents: ${error}`, status: 500 });
        }
    }
}
