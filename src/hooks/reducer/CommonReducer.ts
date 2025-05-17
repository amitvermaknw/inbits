import { GET_LATEST_NEWS } from "@/src/utils/contants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommonReducer = (state: unknown, action: { type: any, content: any }): Array<any> => {
    const new_state = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case GET_LATEST_NEWS:
            return [
                ...new_state,
                ...action.content
            ]
        default:
            return new_state

    }
}

export default CommonReducer;