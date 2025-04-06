import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Newspaper, Shield, Clapperboard } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/src/components/ui/skeleton";
import Image from 'next/image';

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
    }
    ],
    className: "mt-2"
}

export default function MiddlePannel() {
    return (
        latest.news ? <section className="pb-8 border-b-1 lg:border-b-0 mb-8">
            {/* <h1 className="mb-4 ml-2 text-left font-sans  font-bold text-sm md:text-md xl:text-xl">World</h1> */}
            <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mr-2">
                {latest.news.map((item: NewsItem, index: number) => {
                    return <article className="col-span-1 m-auto min-h-full min-w-full  cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2" key={`${item.title}_${index}`}>
                        <a href={`/pdetails/${item.imageUrl ? item.imageUrl : item.imageUrl}`} className="block w-full h-full">
                            <div className="flex-shrink-0 ml-1">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.imageAlt}
                                    width={50}
                                    height={50}
                                    objectFit="cover"
                                    className="object-cover rounded-t-lg rounded-b-lg h-22 max-h-40 w-full"
                                />
                                {/* <img className="object-cover rounded-t-lg rounded-b-lg w-20 h-22 md:h-auto md:w-56" src={item.imageUrl} alt="" /> */}
                            </div>
                            <div className="flex-1 min-w-0 ms-2 mt-2">
                                <div className="text-gray-900 text-sm mb-2">{item.description}</div>
                            </div>
                        </a>
                    </article>
                })}
            </div>
        </section > : <Skeleton />
    )
}