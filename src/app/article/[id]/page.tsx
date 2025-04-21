'use client'

import React from 'react';
import NewsDetails from "../../features/details/component/NewsDetails";
import { useEffect, useState } from "react";
import { Article } from '@/src/interface/article';
import { fetchArticleByCategory, fetchArticleById } from '@/src/services/getArticleById';
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle, } from "@/src/components/ui/alert"
import { POLITICS, SPORTS, TECHNOLOGY } from '@/src/utils/contants';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/src/components/ui/skeleton';

export default function Details() {

    const params = useParams();
    const id = params.id?.toString();

    const [articles, setArticles] = useState<Article[]>([]);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [categoryQueue, setCategoryQueue] = useState([POLITICS, SPORTS, TECHNOLOGY]);
    const [loader, setLoaded] = useState(false);

    useEffect(() => {
        const loadInitial = async () => {
            setLoaded(true);
            if (typeof id !== "string") return;
            const mainArticle = await fetchArticleById(id);
            if (mainArticle.status === 200 && typeof mainArticle.msg === 'object' && mainArticle.msg.length !== 0) {
                setArticles(mainArticle.msg);
            }
            setLoaded(false);
        };
        loadInitial();
    }, [id]);


    const handleReachEnd = async () => {
        const nextCatIndex = currentCategoryIndex + 1;

        if (nextCatIndex < categoryQueue.length) {
            // Next category on same date
            const nextCategory = categoryQueue[nextCatIndex];
            const newArticles = await fetchArticleByCategory(nextCategory, currentDate);

            if (newArticles.status === 200 && typeof newArticles.msg === 'object') {
                if (newArticles.msg.length > 0) {
                    setArticles(newArticles.msg);
                    setCurrentCategoryIndex(nextCatIndex);
                } else {
                    // Skip to next category if empty
                    setCurrentCategoryIndex(nextCatIndex);
                    handleReachEnd();
                }
            }

        } else {
            // All categories done for this date → Move to previous date
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() - 1);

            setCurrentDate(newDate);
            setCurrentCategoryIndex(0);
            const newArticles = await fetchArticleByCategory(categoryQueue[0], newDate);
            if (newArticles.status === 200 && typeof newArticles.msg === 'object') {
                if (newArticles.msg.length > 0) {
                    setArticles(newArticles.msg);

                }
            }
        }
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