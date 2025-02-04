"use client"

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/app";
import { createContext, ReactNode, useState } from "react"
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface OrderItemProps{
    id:string;
    amount: number;
    created_at: string;
    order_id: string;
    product_id: string;
    product:{
        id: string;
        name: string;
        price: number;
        description: string;
        banner: string;
        category_id: string;
    };
    order:{
        id: string;
        table: string;
        name: string | null;
        draft: string;
        status: string;
    };
}

type OrderContextData = {  
   isOpen: boolean;
   onRequestOpen: (order_id: string) => Promise<void>;
   onRequestClose: () => void;
   order: OrderItemProps[];
   finishOrder: (order_id: string) => Promise<void>;
} 

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({children}: OrderProviderProps){
 
    const [isOpen, setIsOpen] = useState(false);
    const [order,setOrder] = useState<OrderItemProps[]>([])
    const router = useRouter();

   async function onRequestOpen(order_id: string){

        const token = getCookieClient();

        const response = await api.get(`/order/detail/`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                order_id: order_id
            }
        });

        setOrder(response.data);
        setIsOpen(true);
    }

    function onRequestClose(){
        setIsOpen(false);
    }

    async function finishOrder(order_id : string){
        const token = getCookieClient();

       
       try {
        const data ={
            order_id: order_id
        }
            await api.put(`/order/finish/`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("Pedido finalizado com sucesso!");

       } catch (error) {
          console.log(error);
          toast.error("Erro ao finalizar pedido, tente novamente!");
          return ;
       }
        setIsOpen(false);
        router.refresh();
    }

    return(
        <OrderContext.Provider 
        value={{isOpen, onRequestOpen, onRequestClose, order, finishOrder}}
        >
            {children}
        </OrderContext.Provider>
    )
}