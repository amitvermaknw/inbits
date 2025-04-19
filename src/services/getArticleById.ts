import { Article } from '../interface/article';
import { APP_BASE_URL } from '../utils/config';

export const fetchArticleById = async (articleId: string): Promise<{ msg: Article | string, status: number }> => {
    try {
        const response = await fetch(`${APP_BASE_URL}/api/article/details/id/?articleId=${articleId}`);
        const result: { msg: Article, status: number } = await response.json();
        return result;
    } catch (error) {
        if (error instanceof Error) {
            return { msg: error.message, status: 500 }
        }
        return { msg: "Error: Not able to fetch latest data", status: 500 }
    }
}

export const fetchArticleByCategory = async (category: string, currentDate: Date): Promise<{ msg: Array<Article> | string, status: number }> => {
    try {
        const response = await fetch(`${APP_BASE_URL}/api/article/details/category/?category=${category}&currentDate=${currentDate}`);
        const result: { msg: Array<Article>, status: number } = await response.json();
        return result;
    } catch (error) {
        if (error instanceof Error) {
            return { msg: error.message, status: 500 }
        }
        return { msg: "Error: Not able to fetch latest data", status: 500 }
    }
}