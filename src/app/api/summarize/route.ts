import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function summarized(articleText: string) {
    try {
        // const { articleText } = await req.json();

        const completion = await openai.chat.completions.create({
            // model: "gpt-4o-mini",
            // store: true,
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are a professional news summarizer. Summarize the following news article into a single concise paragraph that retains the full meaning and completeness of the article. Avoid bullet points, personal opinions, or analysis. Use clear language. Focus strictly on the core facts and events using a neutral tone and journalistic style. After the summary, provide a single-word or short-phrase label for the category the article belongs to, such as Politics, Business, Technology, Entertainment, Health, Science, Sports, or World as seperate parameter, not in same message`,
                },
                {
                    role: 'user',
                    content: articleText,
                },
            ],
            temperature: 0.4,
        });

        const summary = completion.choices[0].message.content;
        return summary;
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}
