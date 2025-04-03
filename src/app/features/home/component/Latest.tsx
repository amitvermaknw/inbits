'use client'
import React from "react";
import Image from "next/image";
import { Skeleton } from "@/src/components/ui/skeleton";

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
        description: "This error message is a fundamental aspect of how Next.js's App Router and React Server Components (RSCs) work.",
        imageUrl: "https://picsum.photos/id/1/200/300",
        imageAlt: "latest"
    },
    {
        title: "latest",
        description: "This error message is a fundamental aspect of how Next.js's App Router and React Server Components (RSCs) work.",
        imageUrl: "https://picsum.photos/id/1/200/300",
        imageAlt: "latest"
    }
    ],
    className: "mt-2"
}

export default function LatestNews() {
    return (
        latest.news ? <section className="py-4">
            <h1 className="mb-4 ml-2 text-left font-sans  font-bold text-sm md:text-md xl:text-xl">Latest</h1>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 ml-2 mr-2">
                {latest.news.map((item: NewsItem, index: number) => {
                    return <article className="w-full h-full" key={`${item.title}_${index}`}>
                        <a href={`/pdetails/${item.imageUrl ? item.imageUrl : item.imageUrl}`} className="flex items-center bg-white border-b border-gray-200 h-full">
                            <div className="flex-shrink-0 ml-1">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.imageAlt}
                                    width={50}
                                    height={50}
                                    objectFit="cover"
                                    className="object-cover rounded-t-lg rounded-b-lg w-20 h-22 mb-4"
                                />
                                {/* <img className="object-cover rounded-t-lg rounded-b-lg w-20 h-22 md:h-auto md:w-56" src={item.imageUrl} alt="" /> */}
                            </div>
                            <div className="flex-1 min-w-0 ms-2 p-2">
                                <div className="text-gray-900 text-sm mb-2">{item.description}</div>
                                {/* <p className="text-gray-700 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!</p> */}
                                <div className="flex flex-wrap gap-3 mt-2">
                                    {/* {item.preprice ? <p className="text-gray-400 text-sm"><del>${item.preprice}</del></p> : ''} */}
                                    {/* <p className="text-green-600 text-sm font-bold">${item.price}</p> */}
                                    {/* <div className="sm:flex sm:justify-between"> */}
                                    {/* <div className="flex items-right"> */}
                                    {/* {item.preview ? <Review props={item.preview} /> : ''} */}
                                    {/* <div className="mt-2">
                                            <button type="button" className=" ml-4 sm:mt-0 px-6 py-1 text-xs font-medium text-center text-whit rounded-lg hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                                Get this deal
                                            </button>
                                        </div> */}

                                    {/* <div className="text-gray-600 ml-2 text-sm md:text-base mt-1">
                                                16 reviews
                                            </div> */}
                                    {/* <div className="flex flex-wrap gap-4 mt-2">
                                            <p className="text-gray-400 text-xl"><del>$123</del></p>
                                            <p className="text-green-600 text-xl font-bold">$23</p>
                                            <div className="mr-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white md:ml-2 xl:ml-2">Limited time deal</div>

                                            <span className="text-sm ml-1 text-gray-400">Deal can be end anytime.</span>
                                        </div> */}
                                    {/* </div> */}

                                    {/* </div> */}

                                </div>

                                <div className="flex flex-wrap mt-2">
                                    {/* {item.ptimeframe ? <div className="mr-2 rounded-2xl bg-red-700 py-1.5 px-4 text-xs text-white md:ml-2 xl:ml-2">{item.ptimeframe}</div> : ''} */}
                                    {/* <button type="button"
                                        onClick={() => window.open(item.producturl, '_blank')}
                                        className="sm:mt-0 px-4 py-0.5 text-xs font-medium text-center text-whit rounded-lg hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 me-2  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                        Get this deal
                                    </button> */}
                                    {/* <span className="text-xs ml-1 text-gray-400 mt-1"><strong>*</strong> Deal can be end anytime.</span> */}
                                </div>
                            </div>
                        </a>
                    </article>
                })}
            </div>
            {/* <div className="flex items-center p-4">
                <button
                    onClick={() => onClick}
                    type="button"
                    className="w-full mt-8 px-4 py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded hover:bg-blue-300">View More</button>
            </div> */}
        </section > : <Skeleton />
    )
    // return (
    //     <div className={cn("space-y-6", latest.className)}>
    //         {latest.news.map((item, index) => (
    //             <div key={index} className="border-b border-gray-200 p-4 mt-2s">
    //                 <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
    //                     <div className="md:w-2/3 w-full">
    //                         {item.description && <p className="text-gray-600">{item.description}</p>}
    //                     </div>
    //                     <div className="md:w-1/3 w-full flex justify-end">
    //                         <Image
    //                             src={item.imageUrl}
    //                             alt={item.imageAlt}
    //                             width={50}
    //                             height={50}
    //                             objectFit="cover"
    //                             className="rounded-lg"
    //                         />
    //                     </div>
    //                 </div>
    //             </div>
    //         ))}
    //     </div>
    // );
};
