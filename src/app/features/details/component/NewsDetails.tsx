'use client'

import React from 'react';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import style from '../css/News.module.css';
import { Article } from '@/src/interface/article';


interface ArticleDetails {
    articles: Article,
    // reachedEnd: (articleId: string, category: string) => void
}

// export default function NewsDetails({ articles }: ArticleDetails) {
//     return (
//         articles.map((item: Article, index: number) => {
//             return <SwiperSlide key={`${item.title}_${index}_slide`} className={style.swiperslide}> <div className="col-span-1 m-auto min-h-full min-w-full  cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2" key={`${item.title}_${index}`}>
//                 <div className="flex-shrink-0 ml-1">
//                     <Image
//                         src={item.urlToImage}
//                         alt="Article image"
//                         width={50}
//                         height={300}
//                         objectFit="cover"
//                         className="object-cover rounded-t-lg rounded-b-lg h-64 w-full"
//                     />
//                 </div>
//                 <div className="flex-1 min-w-0 ms-2 mt-2">
//                     <div className="text-gray-900 font-normal mb-2">{item.summary?.summary}-{item.articleId}</div>
//                 </div>
//             </div>
//             </SwiperSlide>
//         })

//     )
// }

export default function NewsDetails({ articles }: ArticleDetails) {
    return (
        <div className="col-span-1 m-auto min-h-full min-w-full  cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2" key={`${articles.title}`}>
            <div className="flex-shrink-0 ml-1">
                <Image
                    src={articles.urlToImage}
                    alt="Article image"
                    width={50}
                    height={300}
                    objectFit="cover"
                    className="object-cover rounded-t-lg rounded-b-lg h-64 w-full"
                />
            </div>
            <div className="flex-1 min-w-0 ms-2 mt-2">
                <div className="text-gray-900 font-normal mb-2">{articles.summary?.summary}-{articles.articleId}</div>
            </div>
        </div>
    )
}