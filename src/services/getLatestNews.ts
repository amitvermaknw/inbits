import { Article } from '../interface/article';

export const fetchLatestNews = async (callType: string, record: number): Promise<{ msg: Article | string, status: number }> => {
    try {
        const response = await fetch(`/api/ndata/?callType=${callType}&record=${record}`);
        const result: { msg: Article, status: number } = await response.json();
        return result;
    } catch (error) {
        if (error instanceof Error) {
            return { msg: error.message, status: 500 }
        }
        return { msg: "Error: Not able to fetch latest data", status: 500 }
    }
}