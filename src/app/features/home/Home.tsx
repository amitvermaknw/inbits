import Banner from "./component/Banner";
import LatestNews from "./component/Latest";
import MiddlePannel from "./component/MiddlePannel";
import TopStories from "./component/TopStories";

export default function HomePage() {
    return (
        <>
            <Banner />
            <TopStories />
            <section className="mx-auto grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                <div className="sm:col-span-2 px-2">
                    <LatestNews />
                </div>
                <div className="px-2">
                    <MiddlePannel />
                </div>
            </section>
        </>
    )
}

