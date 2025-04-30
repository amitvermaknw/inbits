import { Skeleton } from "@/src/components/ui/skeleton";
import { Article } from "@/src/interface/article";
import { fetchArticleByCategory } from "@/src/services/getArticles";
import Image from 'next/image';


export default async function Sports() {
    const result = await fetchArticleByCategory("sports", new Date());
    return (
        result.msg.length ? <section className="mx-auto grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <div className="sm:col-span-2 px-2">
                <div className="py-4">
                    <h1 className="md:mb-4 mb-4 ml-1 text-left font-sans font-bold md:text-md xl:text-xl">Sports</h1>
                    <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-2 md:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
                        {typeof result.msg === 'object' ? result.msg.map((item: Article, index: number) => {
                            return <article className="w-full h-full" key={`${item.title}_${index}`}>
                                <a href={`/article/${item.slug}`}
                                    className="flex items-center bg-white border-b border-gray-200 h-full">
                                    <div className="flex-shrink-0 ml-1 mb-2">
                                        <Image
                                            src={item.urlToImage}
                                            alt="Article image"
                                            width={60}
                                            height={50}
                                            objectFit="cover"
                                            className="object-cover rounded-t-lg rounded-b-lg w-25 h-20"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-2 p-2">
                                        <div className="text-gray-900 font-normal mb-2">{item.title.replace(/-\s*[^-]*$/, ".").replace(/\s+\./, ".")}</div>
                                    </div>
                                </a>
                            </article>
                        }) : <Skeleton />}
                    </div>
                </div >
            </div>
        </section>
            : <Skeleton />
    )
}