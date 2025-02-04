import { getCookieServer } from '@/lib/cookiServer'
import { Form } from '../components/form'
import styles from './styles.module.scss'
import { api } from '@/services/app';

export default async function Product(){

     const token = await getCookieServer();
    
    const response = await api.get("/categories",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return(
        <Form categories={response.data}/>
    )
}