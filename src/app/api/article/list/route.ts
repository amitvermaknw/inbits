import { NextRequest, NextResponse } from "next/server";
import { QuerySnapshot, DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../../config/firebaseAdmin";
import { Article } from "../../../../interface/article";

const docPath = "inbits_collection/us/articles";
let lastVisibleData: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const records = Number(searchParams.get("record") || 40);
        const callType = searchParams.get("callType");

        let query: QuerySnapshot<DocumentData, DocumentData> | undefined = undefined;

        if (callType == 'start') {
            query = await db.collection(docPath)
                .orderBy("publishedAt", "desc")
                .limit(records).get();
        } else if (callType === 'next') {
            query = await db.collection(docPath)
                .orderBy("publishedAt", "desc")
                .startAfter(lastVisibleData)
                .limit(records).get();
        }

        const others: Array<Article> = [];
        const politics: Array<Article> = [];
        const sports: Array<Article> = [];
        const entertainment: Array<Article> = [];
        const technology: Array<Article> = [];
        const business: Array<Article> = [];
        const health: Array<Article> = [];
        const science: Array<Article> = [];
        const world: Array<Article> = [];

        for (const doc of query?.docs ? query.docs : []) {
            lastVisibleData = query?.docs[query.docs.length - 1];
            const documentData = doc.data();
            documentData['documentId'] = doc.id;

            if (documentData["summary"].hasOwnProperty("category")) {
                if (documentData["summary"]["category"].toLowerCase() === 'politics') {
                    politics.push(documentData as Article)
                } else if (documentData["summary"]["category"].toLowerCase() === 'sports') {
                    sports.push(documentData as Article)
                } else if (documentData["summary"]["category"].toLowerCase() === 'entertainment') {
                    entertainment.push(documentData as Article)
                } else if (documentData["summary"]["category"].toLowerCase() === 'technology') {
                    technology.push(documentData as Article)
                } else if (documentData["summary"]["category"].toLowerCase() === 'business') {
                    business.push(documentData as Article)
                } else if (documentData["summary"]["category"].toLowerCase() === 'health') {
                    health.push(documentData as Article)
                } else if (documentData["summary"]["category"].toLowerCase() === 'science') {
                    science.push(documentData as Article)
                } else if (documentData["summary"]["category"].toLowerCase() === 'world') {
                    world.push(documentData as Article)
                } else {
                    others.push(documentData as Article);
                }
            } else {
                others.push(documentData as Article);
            }
        }

        return NextResponse.json({
            status: 200,
            msg: {
                politics: politics,
                sports: sports,
                entertainment: entertainment,
                technology: technology,
                business: business,
                health: health,
                science: science,
                world: world,
                others: others
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
