import { Article } from "@/src/interface/article";
import { db } from "../../../config/firebaseAdmin";
const docPath = "inbits_collection/us/articles";

export const fetchArticleById = async (articleId: string) => {
    const snapshot = await db.collection(docPath)
        .where("articleId", "==", articleId)
        .orderBy("publishedAt", "desc")
        .get()

    const result = snapshot.docs.map(doc => ({ ...doc.data() } as Article));
    return result;
}


export const fetchArticlesForCategoryAndDate = async (selectedCategory: string, currentDate: Date) => {
    const startOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1,
        0, 0, 0, 0
    ).toISOString();

    const endOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        23, 59, 59, 999
    ).toISOString();

    const snapshot = await db.collection(docPath)
        .where("summary.category", "==", selectedCategory)
        .where("publishedAt", ">=", startOfDay)
        .where("publishedAt", "<=", endOfDay)
        .orderBy("publishedAt", "desc")
        .get()

    const result = snapshot.docs.map(doc => ({ ...doc.data() } as Article));
    return result;
}