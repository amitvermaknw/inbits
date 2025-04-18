import { NextResponse } from 'next/server';
import { db } from '../../config/firebaseAdmin';
import { nanoid } from "nanoid";
import { generateSlug } from '@/src/utils/slug';

const docPath = "inbits_collection/us/articles";


export async function PUT() {

    // const url = new URL(req.url);
    // const secret = url.searchParams.get('secret');
    // const country = url.searchParams.get('country');

    // if (secret !== process.env.CRON_SECRET) {
    //     return NextResponse.json({ message: 'Unauthorized', code: 401 }, { status: 401 });
    // }

    try {
        const snapshot = await db.collection(docPath).get();
        const batch = db.batch();
        snapshot.forEach((doc) => {
            const data = doc.data();
            const articleId = nanoid(10);
            const slug = generateSlug(data.title, articleId);

            batch.update(doc.ref, {
                articleId,
                slug,
            });
        });

        await batch.commit();
        return NextResponse.json({ message: 'Articles updated to Firebase', code: 200 }, { status: 200 });

    } catch (error) {
        console.error(error);
        if (error instanceof Error)
            return NextResponse.json({ message: error.message, code: 500 }, { status: 500 });
    }
}
