'use client'

import React, { useRef, useState, useEffect } from 'react';
import NewsDetails from "../../features/details/component/NewsDetails";
import { Article } from '@/src/interface/article';
import { fetchArticles } from '@/src/services/getArticles';
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle, } from "@/src/components/ui/alert"
import { POLITICS, SPORTS, TECHNOLOGY, WORLD, ENTERTAINMENT, BUSINESS, HEALTH, SCIENCE, OTHERS } from '@/src/utils/contants';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper";
import { Mousewheel, Navigation } from 'swiper/modules';
import BarLoader from '@/src/components/ui/barloader';
// import style from '../css/News.module.css';

const categories = [POLITICS, SPORTS, ENTERTAINMENT, TECHNOLOGY, BUSINESS, HEALTH, SCIENCE, WORLD, OTHERS];


export default function Details() {
    const params = useParams();
    const fetchWithArticleId = params.id?.toString();
    const [articles, setArticles] = useState<Article[]>([]);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loader, setLoaded] = useState(false);
    const [artId, setArtId] = useState('');
    const swiperRef = useRef<SwiperCore | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [trackCategories, setTrackCategories] = useState<string[]>([]);
    const trackCategory = new Set();
    const swipeStatus = localStorage.getItem("swipestatus");


    const fetchContent = async (category: string, articleId: string) => {
        const today = new Date();
        const diffDays = Math.floor((today.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays >= 10) {
            return;
        }

        const nextArticles = await fetchArticles(category, currentDate, articleId);
        if (category) {
            trackCategory.add(category);
        }
        setTrackCategories(prev => {
            const findIndex = prev.findIndex(item => item === category);
            if (category && findIndex < 0) {
                return [...prev, category]
            }
            return prev;
        })

        if (nextArticles.msg.length > 0) {
            setArticles(prev => {
                const existingIds = new Set(prev.map(article => article.articleId));
                const newArticles = (nextArticles.msg as Array<Article>).filter(article => !existingIds.has(article.articleId));
                return [...prev, ...newArticles];
            });
        } else if (currentCategoryIndex < categories.length - 1) {
            const findIndex = trackCategories.findIndex(item => item === category);
            if (findIndex === currentCategoryIndex) {
                setCurrentCategoryIndex(prev => prev + 2);
            } else {
                setCurrentCategoryIndex(prev => prev + 1);
            }
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
            setLoaded(true);
            const category = categories[currentCategoryIndex];
            await fetchContent(category, artId);
            setLoaded(false);
        }
        triggerFetch();
    }, [currentCategoryIndex])


    const handleReachEnd = async (articleId: string, category: string) => {
        setLoaded(true);
        localStorage.setItem("swipestatus", "done")
        if (swiperRef.current && typeof swiperRef.current.activeIndex === "number") {
            setActiveIndex(swiperRef.current.activeIndex);
        }
        setArtId(articleId)
        await fetchContent(category, articleId)
        setLoaded(false);
    };

    return (<>
        {/* {!loader ? */}
        <div className='md:max-w-4xl mx-auto pb-8 pt-4 p-2 h-full'>
            <div className="grid md:grid-cols-3 md:gap-4 ">
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    direction={'vertical'}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    mousewheel={true}
                    onSlideChange={(swiper) => {
                        if (swiper.activeIndex === swiper.slides.length - 1) {
                            handleReachEnd(articles[swiper.activeIndex].articleId as string, articles[swiper.activeIndex].summary?.category as string)
                        }
                    }}
                    initialSlide={activeIndex}
                    modules={[Mousewheel, Navigation]}
                    className="w-full h-screen md:h-screen px-4 md:col-span-4 md:col-sart-2"
                >
                    {articles.map((item: Article, index: number) => (
                        <SwiperSlide key={`${item.title}_${index}_slide`} className="">
                            <NewsDetails articles={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <BarLoader loading={loader} />
                {!swipeStatus && <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-700 animate-bounce z-50 md:hidden">
                    <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                    <span className="text-sm font-medium">Swipe Up</span>
                </div>}
            </div>
        </div>
        {!articles.length && loader == false && typeof articles !== 'object' && <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Something is wrong from our end, we will resume shortly.
            </AlertDescription>
        </Alert>}

    </>)
}