import { ArticleProps } from '../interface/article';
import { APP_BASE_URL } from '../utils/config';

export const fetchLatestNews = async (callType: string, record: number): Promise<{ msg: ArticleProps | string, status: number }> => {
    try {
        console.log("base url = ", APP_BASE_URL);
        console.log("callType = ", callType);
        console.log("record = ", record);

        const response = await fetch(`${APP_BASE_URL}/api/article/list/?callType=${callType}&record=${record}`);
        const result: { msg: ArticleProps, status: number } = await response.json();

        console.log("Print Result = ", JSON.stringify(result));
        return result;
    } catch (error) {
        if (error instanceof Error) {
            return { msg: error.message, status: 500 }
        }
        return { msg: "Error: Not able to fetch latest data", status: 500 }
    }
}