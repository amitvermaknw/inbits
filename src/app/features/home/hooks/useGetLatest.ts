import { useReducer } from "react";
import { GET_LATEST_NEWS } from "@/src/utils/contants";
import { fetchLatestNews } from "@/src/services/getLatestNews";
import CommonReducer from "@/src/hooks/reducer/CommonReducer";
import { Article } from "@/src/interface/article";

const useGetLatest = (initState: Array<Article>) => {

    const [pstate, dispatch] = useReducer(CommonReducer, initState)

    const fetchNews = async (callType: string, record: number) => {
        const result = await fetchLatestNews(callType, record);
        if (result.status === 200) {
            dispatch({ type: GET_LATEST_NEWS, content: result.msg })
            localStorage.setItem('deals_cache', JSON.stringify(pstate));
        }
    }
    return [pstate, fetchNews] as const;
};

export default useGetLatest;