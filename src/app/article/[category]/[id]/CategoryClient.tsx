'use client';
import { useArticleContext } from '@/src/hooks/useArticleContext';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper";
import { useEffect, useRef, useState } from 'react';
import { Mousewheel, Navigation } from 'swiper/modules';
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle, } from "@/src/components/ui/alert"
import BarLoader from '@/src/components/ui/barloader';
import { Article } from '@/src/interface/article';
import NewsDetails from '@/src/app/features/details/component/NewsDetails';
import { fetchArticleByCategoryAndId } from '@/src/services/getArticles';

const CategoryClient = ({ category, id }: { category: string, id: string }) => {
    const swiperRef = useRef<SwiperCore | null>(null);
    const [loader, setLoaded] = useState(false);
    const [swipeStatus, setSwipeStatus] = useState<string | null>(null);
    // const { category, id } = useParams();
    const { articles } = useArticleContext();
    const [nextArticles, setNextArticles] = useState<Article[]>([]);
    const router = useRouter();

    const handleReachEnd = async () => {
        localStorage.setItem("swipestatus", "done");
        setSwipeStatus("done")
    };

    useEffect(() => {
        async function initLoad() {
            const swipeStatus = localStorage.getItem("swipestatus") || null;
            setSwipeStatus(swipeStatus)
            setLoaded(true);

            if (!articles.length) {
                // router.push(`/${category}`)
                const result: { msg: Array<Article> | string, status: number } = await fetchArticleByCategoryAndId(category as string, new Date(), id as string);
                if (result.status === 200 && result.msg?.length && typeof result.msg === 'object') {
                    setNextArticles(result.msg)
                }
            } else {
                let articleId = null;
                if (typeof id === 'string') {
                    articleId = id.split(/--/).pop() || id.split(/-/).pop();
                }
                const index = articles.findIndex(article => article.articleId === articleId);
                if (index !== -1) {
                    const clickedArticle = articles[index];
                    const restArticle = [...articles.slice(0, index), ...articles.slice(index + 1)];
                    const reorderArticle = [clickedArticle, ...restArticle];
                    setNextArticles(reorderArticle);
                }
            }
            setLoaded(false);
        }

        initLoad();

    }, [articles, category, id, router])

    return (<>
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
                            handleReachEnd()
                        }
                    }}
                    modules={[Mousewheel, Navigation]}
                    className="w-full h-screen md:h-screen px-4 md:col-span-4 md:col-sart-2"
                >
                    {nextArticles.map((item: Article, index: number) => (
                        <SwiperSlide key={`${item.title}_${index}_slide`} className="">
                            <NewsDetails articles={item} urlType={`${category}`} />
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

    </>);
}

export default CategoryClient;