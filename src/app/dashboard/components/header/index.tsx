"use client"
import Link from 'next/link'
import styles from './style.module.scss'
import logoImg from "/public/logo.svg"
import Image from 'next/image'
import {LogOutIcon} from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
export function Header(){
    const router = useRouter();

    async function handleLogout(){   


        deleteCookie("session",{ path:'/'})    
 
         router.replace("/")
         toast.success("Logout feito com sucesso!")

    }

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                    <Link href='/dashboard'>
                     <Image alt='Logo' src={logoImg} width={190} height={60} priority={true} quality={100}/>
                    </Link>

                    <nav>
                        <Link href="/dashboard/category">categorias</Link>
                        <Link href="/dashboard/product">produtos</Link>
                     
                     <form action={handleLogout}>
                        <button type='submit'>
                            <LogOutIcon size={24} color='#fff'/>
                        </button>
                     </form>

                    </nav>
            </div>
        </header>
    )
}