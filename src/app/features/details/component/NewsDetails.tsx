'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Skeleton } from "@/src/components/ui/skeleton";
import Image from 'next/image';
import { Mousewheel, Navigation } from 'swiper/modules';
import style from '../css/News.module.css';
import { Article } from '@/src/interface/article';

interface ArticleDetails {
    articles: Array<Article>,
    reachedEnd: () => void
}

export default function NewsDetails({ articles, reachedEnd }: ArticleDetails) {
    return (
        <div className='md:max-w-4xl mx-auto pb-8 pt-4 p-2 h-full'>
            <div className="grid md:grid-cols-3 md:gap-4 ">
                <Swiper
                    direction={'vertical'}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    mousewheel={true}
                    onReachEnd={() => reachedEnd?.()}
                    modules={[Mousewheel, Navigation]}
                    className="w-full h-screen md:h-screen px-4 md:col-span-4 md:col-sart-2"
                >
                    {articles.map((item: Article, index: number) => {
                        return <SwiperSlide key={`${item.title}_${index}_slide`} className={style.swiperslide}> <div className="col-span-1 m-auto min-h-full min-w-full  cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2" key={`${item.title}_${index}`}>
                            {/* <a href={`/pdetails/${item.imageUrl ? item.imageUrl : item.imageUrl}`} className="block w-full h-full"> */}
                            <div className="flex-shrink-0 ml-1">
                                <Image
                                    src={item.urlToImage}
                                    alt="Article image"
                                    width={50}
                                    height={300}
                                    objectFit="cover"
                                    className="object-cover rounded-t-lg rounded-b-lg h-64 w-full"
                                />
                            </div>
                            <div className="flex-1 min-w-0 ms-2 mt-2">
                                <div className="text-gray-900 font-normal mb-2">{item.summary?.summary}</div>
                            </div>
                            {/* </a> */}
                        </div>
                        </SwiperSlide>
                    })}
                </Swiper>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-700 animate-bounce z-50 md:hidden">
                    <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                    <span className="text-sm font-medium">Swipe Up</span>
                </div>
            </div>

        </div>
    )


}