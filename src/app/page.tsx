import Link from "next/link";
import styles from "./page.module.scss";
import logoImg from "/public/logo.svg"
import Image from 'next/image'
import { api } from "@/services/app";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export default function Home() {

   async function handleLogin(formData: FormData){
       "use server"

      const email = formData.get("email");
      const password = formData.get("password")

      if(!email || !password){
         return;
      }

      try{

        const response = await api.post("/session",{
          email,
          password
        })

        if(!response.data.token){
          return;
        }


         ;(await cookies()).set("session", response.data.token, {
           maxAge: 60*60*24*30*1000,
           path:"/",
           httpOnly:false,
           secure: process.env.NODE_ENV === "production" 
         })



      }catch(err){
        console.log(err)
        return;
      }
      redirect("/dashboard")

   }


  return (
    <>
      <div className={styles.containerCenter}>
        <Image
        src={logoImg}
        alt="Logo da pizzaria"
        />
        
        <section className={styles.login}>  

           <form action={handleLogin}>
               <input
                type="email"
                required
                name="email"
                placeholder="Digite seu email..."
                className={styles.input}
               />
                <input
                type="password"
                required
                name="password"
                placeholder="Digite sua senha..."
                className={styles.input}
               />

               <button type="submit" className={styles.button}>Acessar</button>
           </form>

           <Link href="/signup" className={styles.text}>Não possui uma conta? Cadastre-se </Link>

        </section>


      </div>
    </>
  
  );
}
