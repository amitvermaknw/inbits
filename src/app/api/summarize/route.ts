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
                    content:
                        'You are a professional news summarizer. Summarize the following news article into a single concise paragraph that retains the full meaning and completeness of the article. Make it concise, factual, and preserve the key meaning of the article. Avoid opinions or conclusions. Use clear language.',
                },
                {
                    role: 'user',
                    content: articleText,
                },
            ],
            temperature: 0.4,
        });

        const summary = completion.choices[0].message.content;
        return NextResponse.json({ summary });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}
