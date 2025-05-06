'use client';

import { Skeleton } from "@/src/components/ui/skeleton";
import { Article } from "@/src/interface/article";
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle, } from "@/src/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useArticleContext } from "@/src/hooks/useArticleContext";
import { useRouter } from "next/navigation";


export default function ClientPage({ allArticles }: { allArticles: Article[] }) {
    const router = useRouter();
    const { setArticles } = useArticleContext();
    const handleArticleClick = (id: string) => {
        setArticles(allArticles);
        router.push(`/article/technology/${id}`);
    };

    return (
        allArticles.length ? <section className="md:py-4">
            <h1 className="p-2 mb-2 text-left font-sans font-bold md:text-md xl:text-xl">Technology</h1>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 p-2">
                {typeof allArticles === 'object' ? allArticles.map((item: Article, index: number) => {
                    return <article className="w-full h-full" key={`${item.title}_${index}`}>
                        <a onClick={() => handleArticleClick(item.slug as string)}
                            className="flex items-center bg-white border-b border-gray-200 h-full">
                            <div className="flex-shrink-0 ml-1 mb-2">
                                <Image
                                    src={item.urlToImage}
                                    alt={item.title}
                                    width={60}
                                    height={50}
                                    objectFit="cover"
                                    className="object-cover rounded-t-lg rounded-b-lg w-25 h-20"
                                />
                            </div>
                            <div className="flex-1 min-w-0 ms-2 p-2">
                                <div className="text-gray-900 font-bold mb-2">{item.title.replace(/-\s*[^-]*$/, ".").replace(/\s+\./, ".")}</div>
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