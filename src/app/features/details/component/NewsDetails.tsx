'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from "@/src/components/ui/skeleton";
import Image from 'next/image';
import { Mousewheel, Pagination } from 'swiper/modules';
import style from '../css/News.module.css';

interface NewsItem {
    title: string;
    description?: string;
    imageUrl: string;
    imageAlt: string;
    className?: string;
}

interface NewsListProps {
    news: NewsItem[];
    className?: string;
}

const latest: NewsListProps = {
    news: [{
        title: "latest",
        description: "This error message is a fundamental aspect of how Next.js's",
        imageUrl: "https://picsum.photos/id/1/200/300",
        imageAlt: "latest"
    },
    {
        title: "latest",
        description: "This error message is a fundamental aspect of how Next.js's",
        imageUrl: "https://picsum.photos/id/1/200/300",
        imageAlt: "latest"
    },
    {
        title: "latest",
        description: "This error message is a fundamental aspect of how Next.js's",
        imageUrl: "https://picsum.photos/id/1/200/300",
        imageAlt: "latest"
    },
    {
        title: "latest",
        description: "This error message is a fundamental aspect of how Next.js's",
        imageUrl: "https://picsum.photos/id/1/200/300",
        imageAlt: "latest"
    }
    ],
    className: "mt-2"
}

export default function NewsDetails() {
    // return (
    //     latest.news ? <section className="pb-8 border-b-1 lg:border-b-0 pt-8 p-4">
    //         <Swiper
    //             direction={'vertical'}
    //             slidesPerView={1}
    //             spaceBetween={30}
    //             mousewheel={true}
    //             pagination={{
    //                 clickable: true,
    //             }}
    //             modules={[Mousewheel, Pagination]}
    //             className={`mySwiper ${style.swiper1}`}
    //         >
    //             {latest.news.map((item: NewsItem, index: number) => {
    //                 return <SwiperSlide key={`${item.title}_${index}_slide`} className={style.swiperslide}> <div className="col-span-1 m-auto min-h-full min-w-full  cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2" key={`${item.title}_${index}`}>
    //                     <a href={`/pdetails/${item.imageUrl ? item.imageUrl : item.imageUrl}`} className="block w-full h-full">
    //                         <div className="flex-shrink-0 ml-1">
    //                             <Image
    //                                 src={item.imageUrl}
    //                                 alt={item.imageAlt}
    //                                 width={50}
    //                                 height={300}
    //                                 objectFit="cover"
    //                                 className="object-cover rounded-t-lg rounded-b-lg h-full w-full"
    //                             />
    //                         </div>
    //                         <div className="flex-1 min-w-0 ms-2 mt-2">
    //                             <div className="text-gray-900 text-sm mb-2">{item.description}</div>
    //                         </div>
    //                     </a>
    //                 </div>
    //                 </SwiperSlide>
    //             })}
    //             <SwiperSlide className={style.swiperslide1} >Slide 1</SwiperSlide>
    //             <SwiperSlide className={style.swiperslide1}>Slide 2</SwiperSlide>
    //             <SwiperSlide className={style.swiperslide1}>Slide 3</SwiperSlide>
    //             <SwiperSlide className={style.swiperslide1}>Slide 4</SwiperSlide>
    //         </Swiper>
    //     </section > : <Skeleton />
    // )

    <>
        <Swiper
            direction={'vertical'}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
                clickable: true,
            }}
            modules={[Mousewheel, Pagination]}
            className={`mySwiper ${style.swiper1}`}
        >
            <SwiperSlide className={style.swiperslide1}>Slide 1</SwiperSlide>
            <SwiperSlide className={style.swiperslide1}>Slide 2</SwiperSlide>
            <SwiperSlide className={style.swiperslide1}>Slide 3</SwiperSlide>
            <SwiperSlide className={style.swiperslide1}>Slide 4</SwiperSlide>
            <SwiperSlide className={style.swiperslide1}>Slide 5</SwiperSlide>
            <SwiperSlide className={style.swiperslide1}>Slide 6</SwiperSlide>
            <SwiperSlide className={style.swiperslide1}>Slide 7</SwiperSlide>
            <SwiperSlide className={style.swiperslide1}>Slide 8</SwiperSlide>
            <SwiperSlide className={style.swiperslide1}>Slide 9</SwiperSlide>
        </Swiper>
    </>


}