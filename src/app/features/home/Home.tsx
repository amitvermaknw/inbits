import Banner from "./component/Banner";
import LatestNews from "./component/Latest";
// import LatestNews2 from "./component/Latest2";
import TopStories from "./component/TopStories";

export default function HomePage() {
    return (
        <>
            <Banner />
            <TopStories />
            <LatestNews />
            {/* <LatestNews2 /> */}
        </>
    )
} 