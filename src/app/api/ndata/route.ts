import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

export async function GET() {
    try {
        const result: AxiosResponse<{ token: string, msg?: string }> = await axios.get<{ token: string, msg?: string }>(`${process.env.NEWDATA_END_POINT}/api/1/latest?apikey=${process.env.NEWDATA_API_KEY}`);
        if (result.status === 200) {
            return NextResponse.json({ staus: 200, msg: "logged In" });
        } else {
            return NextResponse.json({ staus: 200, msg: result.data.msg });
        }

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ status: 401, error: error.message })
        }

        return NextResponse.json({ status: 401, error: error })

    }
}
