import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export async function fetchArticleContent(url: string): Promise<{ code: number, msg: string | null }> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return { code: 500, msg: "Failed to fetch the page" };
        }

        try {
            const html = await response.text();
            const dom = new JSDOM(html, { url });
            const reader = new Readability(dom.window.document);
            const article = reader.parse();
            return { code: 200, msg: article?.textContent || null };
        } catch (error) {
            if (error instanceof Error)
                console.error('Error fetching or parsing the article:', error.message);
            return { code: 500, msg: "Error fetching or parsing the article" }
        }

    } catch (error) {
        if (error instanceof Error)
            console.error('Error fetching or parsing the article:', error.message);
        return { code: 500, msg: "Error fetching or parsing the article" }
    }
}
