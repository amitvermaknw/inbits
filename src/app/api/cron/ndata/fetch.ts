import type { NextApiRequest, NextApiResponse } from 'next';
// import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { db } from '../config/firebaseAdmin';
import axios, { AxiosResponse } from 'axios';

const docPath = "streetdeals_collection/streetdeals/banner_details";
// let lastVisibleData: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { secret } = req.query;

    if (secret !== process.env.CRON_SECRET) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const result: AxiosResponse<[]> = await axios.get<[]>(`${process.env.NEWDATA_END_POINT}/api/1/latest?apikey=${process.env.NEWDATA_API_KEY}`);
        if (result.status === 200) {
            const articles = result.data as Array<unknown>
            const batchPromises = articles.map(async (article: any) => {
                const snapshot = await db.collection(docPath).add(article);
                if (snapshot.id) {
                    res.status(200).send({ msg: "Article added successfully" });
                } else {
                    res.status(400).send({ msg: "Error while add transaction" });
                }
            });

            await Promise.all(batchPromises);

            res.status(200).json({ message: 'Articles saved to Firebase', count: articles.length });
        } else {
            res.status(400).json({ message: 'Failed to save article response', count: 0 });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching or saving articles' });
    }
}
