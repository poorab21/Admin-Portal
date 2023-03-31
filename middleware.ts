import { NextRequest , NextResponse } from "next/server";

export default function middleware(req : NextRequest){
    const token = req.cookies.get('token')?.value
    const path = req.nextUrl.pathname
    if(token && path === '/'){
        return NextResponse.redirect(new URL('/App/Dashboard',req.url))
    }
    else if(token && path.includes('/App/')) return NextResponse.next()
    else if(!token && path === '/') return NextResponse.next()
    else if(!token && path.includes('/App/')) return NextResponse.redirect(new URL('/',req.url))
    
}