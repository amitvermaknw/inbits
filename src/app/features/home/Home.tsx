import Banner from "./component/Banner";
import CategoryMenu from "./component/Categories";
import LatestNews from "./component/Latest";
import Pannel from "./component/Pannel";
// import LatestNews2 from "./component/Latest2";
import TopStories from "./component/TopStories";

export default function HomePage() {
    return (
        <>
            <Banner />
            <TopStories />
            <LatestNews />
            <div className="w-full h-full md:flex">
                <div className="flex-shrink-0 m-2 p-2 mr-4">
                    <CategoryMenu />
                </div>
                <div className="flex-1 min-w-0 ms-2 p-2">
                    <Pannel />
                </div>
            </div>

            {/* <LatestNews2 /> */}
        </>
    )
} 