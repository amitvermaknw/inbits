import { Article } from '../interface/article';
import { APP_BASE_URL } from '../utils/config';

export const fetchArticleById = async (articleId: string): Promise<{ msg: Array<Article> | string, status: number }> => {
    try {
        const slug = articleId.substring(0, articleId.lastIndexOf('--')) || articleId.substring(0, articleId.lastIndexOf('-'));
        const id = articleId.split(/--?/).pop() || '';

        const response = await fetch(`${APP_BASE_URL}/api/article/details/id/?articleId=${id}&slug=${slug}`);
        const result: { msg: Array<Article>, status: number } = await response.json();
        return result;
    } catch (error) {
        if (error instanceof Error) {
            return { msg: error.message, status: 500 }
        }
        return { msg: "Error: Not able to fetch latest data", status: 500 }
    }
}

// export const fetchArticleByCategory = async (category: string, currentDate: Date, articleId: string): Promise<{ msg: Array<Article> | string, status: number }> => {
//     try {
//         const isoDate = currentDate.toISOString();
//         const response = await fetch(`${APP_BASE_URL}/api/article/details/category/?category=${category}&articleId=${articleId}&currentDate=${encodeURIComponent(isoDate)}`);
//         const result: { msg: Array<Article>, status: number } = await response.json();
//         return result;
//     } catch (error) {
//         if (error instanceof Error) {
//             return { msg: error.message, status: 500 }
//         }
//         return { msg: "Error: Not able to fetch latest data", status: 500 }
//     }
// }


/*export const fetchArticles = async (category: string, currentDate: Date, articleId: string): Promise<{ msg: { articles: Array<Article>, nextDate: Date, nextCategoryIndex: number, isComplete: boolean } | string, status: number }> => {
    try {
        const isoDate = currentDate.toISOString();
        const slug = articleId.substring(0, articleId.lastIndexOf('--')) || articleId.substring(0, articleId.lastIndexOf('-'));

        if (category === '') {
            articleId = articleId.split(/--?/).pop() || '';
        }

        const response = await fetch(`${APP_BASE_URL}/api/article/details/?category=${category}&articleId=${articleId}&currentDate=${encodeURIComponent(isoDate)}&slug=${slug}`);
        const result: { msg: { articles: Array<Article>, nextDate: Date, nextCategoryIndex: number, isComplete: boolean }, status: number } = await response.json();
        return result;

    } catch (error) {
        if (error instanceof Error) {
            return { msg: error.message, status: 500 }
        }
        return { msg: "Error: Not able to fetch latest data", status: 500 }
    }
}*/

export const fetchArticles = async (payload: {
    currentDate: Date,
    excludeIds: string[],
    categories: string[],
    selectedCategory: string,
    currentCategoryIndex: number,
    articleId: string,
    slug?: string,
}): Promise<{ msg: { articles: Array<Article>, nextDate: Date, nextCategoryIndex: number, isComplete: boolean } | string, status: number }> => {
    try {
        payload.slug = payload.articleId.substring(0, payload.articleId.lastIndexOf('--')) || payload.articleId.substring(0, payload.articleId.lastIndexOf('-'));
        if (payload.articleId !== '') {
            payload.articleId = payload.articleId.split(/--?/).pop() || '';
        }

        const response = await fetch(`${APP_BASE_URL}/api/article/details/category`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result: { msg: { articles: Array<Article>, nextDate: Date, nextCategoryIndex: number, isComplete: boolean }, status: number } = await response.json();
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
        const isoDate = currentDate.toISOString();
        const response = await fetch(`${APP_BASE_URL}/api/article/${category}/?category=${category}&currentDate=${encodeURIComponent(isoDate)}`);
        const result: { msg: Array<Article>, status: number } = await response.json();
        return result;
    } catch (error) {
        if (error instanceof Error) {
            return { msg: error.message, status: 500 }
        }
        return { msg: "Error: Not able to fetch latest data", status: 500 }
    }
}


export const fetchArticleByCategoryAndId = async (category: string, currentDate: Date, slugId: string): Promise<{ msg: Array<Article> | string, status: number }> => {
    try {
        const isoDate = currentDate.toISOString();
        const slug = slugId.substring(0, slugId.lastIndexOf('--')) || slugId.substring(0, slugId.lastIndexOf('-'));
        slugId = slugId.split(/--?/).pop() || '';

        const response = await fetch(`${APP_BASE_URL}/api/article/category/?category=${category}&currentDate=${encodeURIComponent(isoDate)}&articleId=${slugId}&slug=${slug}`);
        const result: { msg: Array<Article>, status: number } = await response.json();
        return result;
    } catch (error) {
        if (error instanceof Error) {
            return { msg: error.message, status: 500 }
        }
        return { msg: "Error: Not able to fetch latest data", status: 500 }
    }
}