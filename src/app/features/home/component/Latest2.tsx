'use client'
import React from "react";
import Image from "next/image";
// import { cn } from "@/src/lib/utils";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card";
import { PageLoader } from "@/src/components/ui/pageloader";
// import { Button } from "@/src/components/ui/button";
import { DEFAULT_IMAGE } from "@/src/utils/contants";


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


export default function LatestNews2() {
    return latest.news ? (
        <section className="mb-8">
            {/* <h1 className="mb-4 ml-2 text-left font-sans font-bold text-sm md:text-md xl:text-xl">
                Latest
            </h1> */}
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 mr-2">
                {latest.news.map((item: NewsItem, index: number) => (
                    <Card key={`${item.title}_${index}`} className="w-full h-full py-0">
                        <CardContent className="flex items-center px-0">
                            <div className="flex-shrink-0 mr-4">
                                <Image
                                    src={item.imageUrl ? item.imageUrl : DEFAULT_IMAGE}
                                    alt={item.imageAlt}
                                    width={56}
                                    height={56}
                                    className="rounded-lg w-20 h-22"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-sm font-light">
                                    {item.description}
                                </CardTitle>
                                {/* Add other content here if needed */}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {/* <div className="flex items-center p-4">
                <Button onClick={onClick} className="w-full mt-8" variant="outline">
                    View More
                </Button>
            </div> */}
        </section>
    ) : (
        <PageLoader />
    );
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
