import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function summarized(articleText: string) {
    try {
        const completion = await openai.chat.completions.create({
            // model: "gpt-4o-mini",
            // store: true,
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "system",
                    content: "You are a professional news summarizer.",
                },
                {
                    role: "user",
                    content: `
                        Summarize the following news article into a single concise paragraph of 60 to 70 words that retains the full meaning and completeness of the article. Avoid bullet points, personal opinions, or analysis. Use clear language. Focus strictly on the core facts and events using a neutral tone and journalistic style.
                        
                        Also, create a clear and descriptive title of 10 to 15 words that accurately captures the main idea of the article. Use sentence case—capitalize only the first letter of the first word and any proper nouns.

                        Then provide a single-word or short-phrase label for the category the article belongs to (e.g., Politics, Business, Technology, Entertainment, Health, Science, Sports, or World). Respond strictly as raw JSON, without markdown formatting or code blocks. Do not include triple backticks or any extra text.

                        Respond **only in the following valid JSON format**:

                        {
                            "title": "Article title here in 10-15 words",
                            "summary": "The article discusses...",
                            "category": "Politics"
                        }

                        Here is the article:

                        ${articleText}
                        `,
                },
            ],
            temperature: 0.4,
        });

        const rawText = completion.choices[0].message.content;
        if (rawText) {
            const jsonString = rawText?.replace(/```json\n?/, '')
                .replace(/```/, '')
                .trim();
            return { code: 200, message: jsonString };
        } else {
            return { code: 500, message: `Not able to summarize article beacuse of = ${rawText}` };
        }
    } catch (err) {
        if (err instanceof Error) {
            return { code: 500, message: err.message }
        }
        return { code: 500, message: err }
    }
}
