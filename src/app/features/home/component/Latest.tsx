'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/src/components/ui/skeleton";
// import useGetLatest from "../hooks/useGetLatest";
// import LatestNewsModel from "@/src/models/LatestNewsModel";
import { Article, ArticleProps } from "@/src/interface/article";

export default function LatestNews(props: ArticleProps) {
    // const [pstate, fetchNews] = useGetLatest(LatestNewsModel);

    // const fetchData = useCallback(async (callType: string, records: number) => {
    //     await fetchNews(callType, records);
    // }, [fetchNews]);
    const [content, getContent] = useState<Article[]>([]);

    useEffect(() => {
        if (typeof props === 'object' && props.hasOwnProperty("politics")) {
            if (Array.isArray(props.politics)) {
                const validArticles = props.politics.slice(0, props.politics.length - 1).filter(Boolean); //4
                getContent(prev => [...prev, ...validArticles]);
            }
        }
        if (typeof props === 'object' && props.hasOwnProperty("sports")) {
            if (Array.isArray(props.sports)) {
                const validArticles = props.sports.slice(0, props.sports.length - 1).filter(Boolean); //3
                getContent(prev => [...prev, ...validArticles]);
            }
        }

        if (typeof props === 'object' && props.hasOwnProperty("entertainment")) {
            if (Array.isArray(props.entertainment)) {
                const validArticles = props.entertainment.slice(0, props.entertainment.length - 1).filter(Boolean); //2
                getContent(prev => [...prev, ...validArticles]);
            }
        }

        if (typeof props === 'object' && props.hasOwnProperty("technology")) {
            if (Array.isArray(props.technology)) {
                const validArticles = props.technology.slice(1, props.technology.length - 1).filter(Boolean);
                getContent(prev => [...prev, ...validArticles]);
            }
        }
    }, [props]);

    return (
        content.length ? <section className="py-4">
            <h1 className="md:mb-4 ml-2 text-left font-sans font-bold md:text-md xl:text-xl">Latest</h1>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-2 md:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
                {content.map((item: Article, index: number) => {
                    return <article className="w-full h-full" key={`${item.title}_${index}`}>
                        <a href={`/pdetails/${item.urlToImage ? item.urlToImage : item.urlToImage}`}
                            className="flex items-center bg-white border-b border-gray-200 h-full">
                            <div className="flex-shrink-0 ml-1 mb-2">
                                <Image
                                    src={item.urlToImage}
                                    alt={item.urlToImage}
                                    width={60}
                                    height={50}
                                    objectFit="cover"
                                    className="object-cover rounded-t-lg rounded-b-lg w-25 h-20"
                                />
                            </div>
                            <div className="flex-1 min-w-0 ms-2 p-2">
                                <div className="text-gray-900 font-normal mb-2">{item.title.replace(/\s*-\s*.+$/, ".")}</div>
                            </div>
                        </a>
                    </article>
                })}
            </div>
        </section > : <Skeleton />
    )
};
