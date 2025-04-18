import React from 'react';
import NewsDetails from "../../features/details/component/NewsDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Article } from '@/src/interface/article';
import { fetchArticleById } from '@/src/services/getArticleById';


export default function Details() {

    const router = useRouter();
    const { id } = router.query;

    const [articles, setArticles] = useState<Article[]>([]);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date()); // Start from today
    const [categoryQueue, setCategoryQueue] = useState(["Politics", "Business", "World", "Tech"]);

    const article = fetchArticleById(id as string);


    return <NewsDetails />
}