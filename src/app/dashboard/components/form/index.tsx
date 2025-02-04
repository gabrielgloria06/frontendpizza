"use client"
import { UploadCloud } from 'lucide-react'
import style from './styles.module.scss'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { Button } from '../button'
import Category from '../../category/page'
import { getCookieClient } from '@/lib/cookieClient'
import { api } from '@/services/app'
import { headers } from 'next/headers'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface categoryProps{
    id:string;
    name: string;
}

interface FormProps {
    categories: categoryProps[];
}

export function Form({categories}: FormProps){

    const router = useRouter();

    const [image,setImage] = useState<File>()
    const [preview, setPreview] = useState("")
   
    function handleFile(e : ChangeEvent<HTMLInputElement>){
         if(e.target.files && e.target.files[0]){
             const image =  e.target.files[0];
         

         if(image?.type !== "image/jpeg" && image?.type !== "image/png"){
            return;
         }

         setImage(image)
         setPreview(URL.createObjectURL(image))

        }
    }

    async function handleProduct(formData: FormData){
           const catIndex = formData.get('category')
           const name = formData.get('name')
           const price = formData.get('price')
           const description = formData.get('description')

           if(!name || !price ||  !description || !catIndex || !image){
               return;
           } 

           const data = new FormData();

           const token = getCookieClient();

           data.append("name", name)
           data.append("price", price)
           data.append("description", description)
           data.append("category_id", categories[Number(catIndex)].id)
           data.append("file", image)

           await api.post("/product",data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
           })


            toast.success("Produto cadastrado com sucesso!")
            router.push("/dashboard")
    }

    return(
        <main className={style.container}>
           <h1>Novo produto</h1>

           <form className={style.form} action={handleProduct}>
            <label className={style.labelImage}>
          
              <span>
                    <UploadCloud size={30} color='#fff'/>
              </span>
          
               <input type="file"
                accept='image/png, image/jpeg '
                required
                onChange={handleFile}
               />    

               {preview && (

                   <Image
                   alt='a'
                   src={preview}
                   className={style.preview}
                   fill={true}
                   quality={100}
                   priority={true}
                   />

               )}
          
            </label>
             <select name='category'>
             {categories.map((category,index)=>{
                 return(
                    <option key={category.id} value={index} >
                        {category.name}
                    </option>
                 )
             })}
            </select>
            <input type="text" name='name' placeholder='Informe o nome do produto...' className={style.input} required/>
            <input type="text" name='price' placeholder='Informe o preço do produto...' className={style.input} required/>
            <textarea className={style.input} name="description" id="" placeholder='Informe a descrição do produto...' required></textarea>
        
        
            <Button name='Cadastrar produto'/>
           </form>
        </main>
    )
}