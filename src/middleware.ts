import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    const { pathname } = req.nextUrl;

    console.log(`Middleware Intercepting: ${pathname}`);

    const session = req.cookies.get("user_session");

    if (pathname.startsWith("/api/dashboard") && !session) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    // if (pathname.startsWith("/api/auth/status") && !session) {
    //     const auth = (await cookies()).get("admin_session")?.value;
    //     if (auth) {
    //         const decode = jwt.verify(auth, process.env.JWT_SECRET!)
    //         return NextResponse.json({ code: 200, isAuthenticated: true, msg: decode }, { status: 200 });
    //     } else {
    //         return NextResponse.json({ code: 500, error: "Unauthorized" }, { status: 401 });
    //     }

    // }



    // if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/admin/login")) {
    //     const token = req.headers.get("Authorization");
    //     if (!token) {
    //         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    //     }

    //     // const modifiedHeaders = new Headers(req.headers);
    //     // modifiedHeaders.set("X-Custom-Header", "middleware-intercepted");

    //     // return NextResponse.next({
    //     //     request: {
    //     //         headers: modifiedHeaders,
    //     //     },
    //     // });

    // }

    return res
}

export const config = {
    matcher: ["/api/:path*"]
}