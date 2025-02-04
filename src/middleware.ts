import {NextRequest,NextResponse} from 'next/server'
import { getCookieServer } from './lib/cookiServer';
import { api } from './services/app';

export async function middleware(req:NextRequest) {
     
    const {pathname} = req.nextUrl;

    if(pathname.startsWith("/_next") || pathname=== "/"){
        return NextResponse.next();

    }

    const token = await getCookieServer();

    if(pathname.startsWith("/dashboard")){
        if(!token){
            return NextResponse.redirect(new URL("/", req.url))
        }

        const isvalid = await validateToken(token)

        if(!isvalid){
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    return NextResponse.next();


}


async function validateToken(token:string){
    if (!token) return false;

    try {
        await api.get("/me",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return true;
        
    } catch (error) {
        return false;
    }
}