import Banner from "./component/Banner";
import CategoryMenu from "./component/CategoriesMenu";
import LatestNews from "./component/Latest";
import MiddlePannel from "./component/MiddlePannel";
import Pannel from "./component/Pannel";
import LatestNews2 from "./component/Latest2";
import TopStories from "./component/TopStories";

export default function HomePage() {
    return (
        <>
            <Banner />
            <TopStories />
            <LatestNews />
            <section className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 ml-2 mr-2 pt-2">
                <div className="flex-shrink-0 mr-2 border-b border-gray-200">
                    <CategoryMenu />
                    <LatestNews2 />
                </div>
                <div className="flex-1 min-w-0 border-b border-gray-200">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 mr-2">
                        <MiddlePannel />
                        <Pannel />
                    </div>
                </div>
            </section>

            {/* <LatestNews2 /> */}
        </>
    )
}

