'use client'

import React from 'react';
import Image from 'next/image';
import { Article } from '@/src/interface/article';


interface ArticleDetails {
    articles: Article,
}

export default function NewsDetails({ articles }: ArticleDetails) {
    return (<>
        <div className="col-span-1 m-auto min-h-full min-w-full  cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2" key={`${articles.title}`}>
            <div className="flex-shrink-0 ml-1">
                <Image
                    src={articles.urlToImage}
                    alt="Article image"
                    width={50}
                    height={300}
                    className="object-cover rounded-t-lg rounded-b-lg h-64 w-full md:h-96"
                />
            </div>
            <div className="flex-1 min-w-0 ms-2 mt-2">
                <div className="text-gray-900 font-bold mb-2">{articles.summary?.title}</div>
            </div>
            <div className="flex-1 min-w-0 ms-2 mt-2">
                <div className="text-gray-900 font-normal mb-2">{articles.summary?.summary}</div>
            </div>

            <div className="flex-1 min-w-0 ms-2 mt-8 ">
                <span className='text-sm text-gray-400'>Check detailed article: <a href={articles.url} target='_blank' >{articles.source.name}</a></span>
            </div>
        </div>
    </>

    )
}