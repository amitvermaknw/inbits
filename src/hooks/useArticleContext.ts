import { useContext } from "react"
import { ArticleContext } from "../app/features/context/ArticleContext"

export const useArticleContext = () => {
    const context = useContext(ArticleContext);
    if (!context) {
        throw new Error('userArticleContext must be within ArticleProvider');
    }
    return context;
}