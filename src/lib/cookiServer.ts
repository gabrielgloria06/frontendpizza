import { cookies } from "next/headers";


export async function getCookieServer(){
    const gc = await cookies();
    const token =  gc.get("session")?.value;

    return token || null;
}