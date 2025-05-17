'use client'
import { Article } from "@/src/interface/article";
import { createContext, ReactNode, useState } from "react";

interface ArticleContextType {
    articles: Article[];
    setArticles: (articles: Article[]) => void;
}

export const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export default function ArticleProvider({ children }: { children: ReactNode }) {
    const [articles, setArticles] = useState<Article[]>([]);
    return (
        <ArticleContext.Provider value={{ articles, setArticles }}>
            {children}
        </ArticleContext.Provider>
    )
}