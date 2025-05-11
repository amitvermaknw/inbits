export const splitIntoChunks = (text: string, wordsPerChunk = 20): string => {
    const words = text.trim().split(/\s+/);
    const chunks: string[] = [];

    for (let i = 0; i < words.length; i += wordsPerChunk) {
        chunks.push(words.slice(i, i + wordsPerChunk).join(' '));
    }

    return chunks.join();
}