'use client'
import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/src/components/ui/skeleton";
import useGetLatest from "../hooks/useGetLatest";
import LatestNewsModel from "@/src/models/LatestNewsModel";
import { Article } from "@/src/interface/article";

export default function LatestNews() {
    const [pstate, fetchNews] = useGetLatest(LatestNewsModel);

    const fetchData = useCallback(async (callType: string, records: number) => {
        await fetchNews(callType, records);
    }, [fetchNews]);

    useEffect(() => {
        fetchData('start', 2);
    }, []);

    return (
        pstate ? <section className="py-4">
            <h1 className="md:mb-4 ml-2 text-left font-sans font-bold md:text-md xl:text-xl">Latest</h1>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-2 md:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
                {pstate.map((item: Article, index: number) => {
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
