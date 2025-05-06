'use client';

import { Skeleton } from "@/src/components/ui/skeleton";
import { Article } from "@/src/interface/article";

import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle, } from "@/src/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useArticleContext } from "@/src/hooks/useArticleContext";
import { useRouter } from "next/navigation";


export default function ClientPolitics({ allArticles }: { allArticles: Article[] }) {

    const router = useRouter();
    const { setArticles } = useArticleContext();
    const handleArticleClick = (id: string) => {
        setArticles(allArticles);
        router.push(`/article/politics/${id}`);
    };

    return (
        allArticles.length ? <section className="md:py-4">
            <h1 className="p-2 mb-2 text-left font-sans font-bold md:text-md xl:text-xl">Politics</h1>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 p-2">
                {typeof allArticles === 'object' ? allArticles.map((item: Article, index: number) => {
                    return <article className="col-span-1 m-auto min-h-full min-w-full  cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2" key={`${item.title}_${index}`}>
                        <a href="#" className="block w-full h-full" onClick={() => handleArticleClick(item.slug as string)}>
                            <div className="flex-shrink-0">
                                <Image
                                    src={item.urlToImage}
                                    alt={item.urlToImage}
                                    width={50}
                                    height={50}
                                    objectFit="cover"
                                    className="object-cover rounded-t-lg rounded-b-lg h-52 w-full md:h-72"
                                />
                            </div>
                            <div className="flex-1 min-w-0 p-2">
                                <div className="text-gray-900 font-bold mb-2">{item.title.replace(/\s*-\s*.+$/, ".")}</div>
                            </div>
                        </a>
                    </article>
                }) :
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Something is wrong from our end, we will resume shortly.
                        </AlertDescription>
                    </Alert>}
            </div>
        </section > : <Skeleton />
    )
}