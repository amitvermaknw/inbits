export const splitIntoChunks = (text: string, wordsPerChunk = 20): string => {
    if (text) {
        const words = text.trim().split(/\s+/);
        const chunks: string[] = [];

        for (let i = 0; i < words.length; i += wordsPerChunk) {
            chunks.push(words.slice(i, i + wordsPerChunk).join(' '));
        }

        return chunks.join();
    } else {
        return 'Stay informed with the latest political, tech, and world news in 60 seconds. Fast, reliable, and always up to date.'
    }

}