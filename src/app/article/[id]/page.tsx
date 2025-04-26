'use client'

import React from 'react';
import NewsDetails from "../../features/details/component/NewsDetails";
import { useEffect, useState } from "react";
import { Article } from '@/src/interface/article';
import { fetchArticleByCategory, fetchArticleById, fetchArticles } from '@/src/services/getArticleById';
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle, } from "@/src/components/ui/alert"
import { POLITICS, SPORTS, TECHNOLOGY, WORLD } from '@/src/utils/contants';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/src/components/ui/skeleton';

const categories = [POLITICS, SPORTS, TECHNOLOGY, WORLD];

export default function Details() {

    const params = useParams();
    const fetchWithArticleId = params.id?.toString();

    const [articles, setArticles] = useState<Article[]>([]);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    // const [categoryQueue, setCategoryQueue] = useState([POLITICS, SPORTS, TECHNOLOGY]);
    const [loader, setLoaded] = useState(false);
    // const [currentArticleCategory, setCurrentArticleCategory] = useState<{ category: string, articleId: string }>({ category: '', articleId: '' });

    const [artId, setArtId] = useState('');
    const tempCategories = [...categories];


    const fetchContent = async (category: string, articleId: string) => {
        const nextArticles = await fetchArticles(category, currentDate, articleId);
        if (nextArticles.msg.length > 0) {
            setArticles(prev => [...prev, ...nextArticles.msg as Array<Article>]);
        } else if (currentCategoryIndex < categories.length - 1) {
            setCurrentCategoryIndex(prev => prev + 1);
            // tempCategories = tempCategories.map(item => {
            //     if (item !== category)
            //         return item;
            // }).filter(data => data !== undefined);
        } else {
            const prevDate = new Date(currentDate);
            prevDate.setDate(prevDate.getDate() - 1);
            setCurrentDate(prevDate);
            setCurrentCategoryIndex(0);
        }
    }


    useEffect(() => {
        const loadInitial = async () => {
            setLoaded(true);
            if (typeof fetchWithArticleId !== "string") return;
            // const mainArticle = await fetchArticleById(id);
            const mainArticle = await fetchArticles('', currentDate, fetchWithArticleId as string);
            if (mainArticle.status === 200 && typeof mainArticle.msg === 'object' && mainArticle.msg.length !== 0) {
                setArticles(mainArticle.msg);
            }
            setLoaded(false);
        };
        loadInitial();
    }, [fetchWithArticleId]);

    useEffect(() => {
        const triggerFetch = async () => {
            const category = categories[currentCategoryIndex];
            await fetchContent(category, artId)
        }
        triggerFetch();
    }, [currentCategoryIndex])


    const handleReachEnd = async (articleId: string, category: string) => {
        setArtId(articleId)
        fetchContent(category, articleId,)
    };

    return (<>
        {articles.length ? <NewsDetails articles={articles} reachedEnd={handleReachEnd} />
            :
            <Skeleton />
        }
        {!articles.length && loader == false && <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Something is wrong from our end, we will resume shortly.
            </AlertDescription>
        </Alert>}

    </>)
}