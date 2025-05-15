// import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import https from 'https'
import axios from 'axios';

export async function fetchArticleContent(url: string): Promise<{ code: number, msg: string | null }> {
    const originalConsoleError = console.error;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'text/html,application/xhtml+xml',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive'
            },
            httpsAgent: new https.Agent({ keepAlive: true })
        });

        try {
            const html = await response.data;
            console.error = (msg, ...args) => {
                if (
                    typeof msg === "string" &&
                    msg.includes("Could not parse CSS stylesheet")
                ) {
                    return;
                }
                originalConsoleError(msg, ...args);
            };

            const dom = new JSDOM(html, { url });
            dom.window.document.querySelectorAll('script, style, noscript').forEach(e => e.remove());

            const reader = new Readability(dom.window.document);
            const article = reader.parse();
            if (!article || !article.textContent || article.textContent.trim().length < 100) {
                console.warn(`[CRON] Article too short or invalid: ${url}`);
                return { code: 204, msg: "Empty or invalid content" };
            }
            console.log(`[CRON] Parsed article from ${url}, length: ${article.textContent.length}`);

            return { code: 200, msg: article?.textContent.trim() || null };
        } catch (error) {
            if (error instanceof Error)
                console.error('Error fetching or parsing the article:', error.message);
            return { code: 500, msg: "Error fetching or parsing the article" }
        } finally {
            console.error = originalConsoleError; // restore original behavior
        }

    } catch (error) {
        if (error instanceof Error)
            console.error('Error fetching or parsing the article:', error.message);
        return { code: 500, msg: "Error fetching or parsing the article" }
    } finally {
        console.error = originalConsoleError;
    }
}
