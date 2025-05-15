import { PageLoader } from "@/src/components/ui/pageloader";
import { Article } from "@/src/interface/article";
import Image from 'next/image';

export default function MiddlePannel(props: { art: Array<Article> }) {
    return (
        props.art.length ? <section className="md:py-4">
            <h1 className="p-2 mb-2 text-left font-sans font-bold md:text-md xl:text-xl">Other News</h1>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                {props.art.map((item: Article, index: number) => {
                    return item.urlToImage && <article className="col-span-1 m-auto min-h-full min-w-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2" key={`${item.title}_${index}`}>
                        <a href={`/article/latest/${item.slug}`} className="items-center bg-white border-b border-gray-200 h-full">
                            <div className="flex-shrink-0">
                                <Image
                                    src={item.urlToImage}
                                    alt={item.title}
                                    width={50}
                                    height={50}
                                    className="object-cover rounded-t-lg rounded-b-lg h-35 max-h-40 w-full"
                                />
                            </div>
                            <div className="flex-1 min-w-0 ms-2 mt-2">
                                <div className="hidden">{item.articleId}</div>
                                <div className="text-gray-900 font-bold mb-2">{item.title.replace(/-\s*[^-]*$/, ".").replace(/\s+\./, ".")}</div>
                            </div>
                        </a>
                    </article>
                })}
            </div>
        </section > : <PageLoader />
    )
}