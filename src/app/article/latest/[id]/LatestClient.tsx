'use client'

import React, { useRef, useState, useEffect } from 'react';
import NewsDetails from "@/src/app/features/details/component/NewsDetails";
import { Article } from '@/src/interface/article';
import { fetchArticles } from '@/src/services/getArticles';
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle, } from "@/src/components/ui/alert"
import { POLITICS, SPORTS, TECHNOLOGY, WORLD, ENTERTAINMENT, BUSINESS, HEALTH, SCIENCE, OTHERS } from '@/src/utils/contants';
// import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper";
import { Mousewheel, Navigation } from 'swiper/modules';
import BarLoader from '@/src/components/ui/barloader';
import { PageLoader } from '@/src/components/ui/pageloader';
import { useCallback } from 'react';


const categories = [POLITICS, SPORTS, ENTERTAINMENT, TECHNOLOGY, BUSINESS, HEALTH, SCIENCE, WORLD, OTHERS];

const LatestClient = ({ fetchWithArticleId }: { fetchWithArticleId: string }) => {
    const [article, setArticles] = useState<{ articles: Array<Article> }>({ articles: [] });
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loader, setLoaded] = useState(false);
    const swiperRef = useRef<SwiperCore | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [swipeStatus, setSwipeStatus] = useState<string | null>(null);
    const [excludeIds, setExcludeIds] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);


    const fetchContent = useCallback(async (selectedCategory: string, articleId: string) => {
        if (isComplete) return;

        const nextArticles = await fetchArticles({
            currentDate,
            excludeIds,
            categories,
            currentCategoryIndex,
            articleId,
            selectedCategory
        });

        if (typeof nextArticles.msg === 'object') {
            if (nextArticles.msg.articles.length) {
                const data: {
                    articles: Array<Article>;
                    nextDate: Date;
                    nextCategoryIndex: number;
                    isComplete: boolean;
                } = nextArticles.msg;

                setArticles(prev => ({
                    ...prev,
                    articles: [...prev.articles, ...data.articles]
                }));

                setExcludeIds(prev => [...prev, ...data.articles.map(a => a.articleId).filter(item => item !== undefined)]);
                setCurrentDate(data.nextDate);
                setCurrentCategoryIndex(data.nextCategoryIndex);
                setIsComplete(data.isComplete);
            }
        } else {
            setArticles(prev => ({
                ...prev,
                articles: []
            }));
        }

    }, [currentCategoryIndex, currentDate, excludeIds, isComplete]);

    useEffect(() => {
        const loadInitial = async () => {
            setLoaded(true);
            const swipe = localStorage.getItem("swipestatus");
            setSwipeStatus(swipe);
            if (typeof fetchWithArticleId !== "string") return;
            await fetchContent('', fetchWithArticleId as string);
            setLoaded(false);
        };
        loadInitial();
    }, [fetchWithArticleId, fetchContent]);


    const handleReachEnd = async (articleId: string, category: string) => {
        setLoaded(true);
        localStorage.setItem("swipestatus", "done")
        if (swiperRef.current && typeof swiperRef.current.activeIndex === "number") {
            setActiveIndex(swiperRef.current.activeIndex);
        }
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
                            handleReachEnd(article.articles[swiper.activeIndex].articleId as string, article.articles[swiper.activeIndex].summary?.category as string)
                        }
                    }}
                    initialSlide={activeIndex}
                    modules={[Mousewheel, Navigation]}
                    className="w-full h-screen md:h-screen px-4 md:col-span-4 md:col-sart-2"
                >
                    {article.articles.map((item: Article, index: number) => (
                        <SwiperSlide key={`${item.title}_${index}_slide`} className="">
                            <NewsDetails articles={item} urlType='latest' />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <BarLoader loading={loader} />
                {loader && <PageLoader />}
                {!swipeStatus && <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-700 animate-bounce z-50 md:hidden">
                    <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                    <span className="text-sm font-medium">Swipe Up</span>
                </div>}
            </div>
        </div>
        {!article.articles.length && loader == false && typeof article.articles !== 'object' && <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Something is wrong from our end, we will resume shortly.
            </AlertDescription>
        </Alert>}

    </>)
}

export default LatestClient;